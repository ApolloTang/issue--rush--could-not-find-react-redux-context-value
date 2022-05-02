const { compilerOptions } = require('./tsconfig.json');

const projectRoot = '<rootDir>'; // https://github.com/facebook/jest/issues/5417

module.exports = {
  // rootDir: '../..', // This is the monorepo root

  testMatch: [
    projectRoot + '/**/__tests__/**/*.[jt]s?(x)',
    projectRoot + '/**/?(*.)+(test).[jt]s?(x)',
    // '<rootDir>/{ui,utils}/**/?(*.)+(test).[jt]s?(x)',
  ],

  testPathIgnorePatterns: ['/node_modules/'],

  modulePaths: [projectRoot + '/src/'],

  testEnvironment: 'jsdom',

  testTimeout: 15000,

  // Automatically clear mock calls and instances before every test
  clearMocks: true,

  // Scripts to run before jest is loaded
  // ------------------------------------
  setupFiles: [
    require.resolve('regenerator-runtime/runtime'), // https://github.com/facebook/jest/issues/5698
  ],

  // Scripts to run after jest is loaded
  // -----------------------------------
  setupFilesAfterEnv: [
    'jest-extended',
    require.resolve('./jest-setup/setup-tests.js'),
  ],

  moduleNameMapper: {
    '^~src/(.*)$': '<rootDir>/src/$1', // https://stackoverflow.com/a/56298746/3136861
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      require.resolve('./jest-setup/file-mock.js'),
    '\\.module\\.css$': 'identity-obj-proxy', // <--- this must come before '\\.css$'
    '\\.(css|less)$': require.resolve('./jest-setup/style-mock.js'),
  },

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
