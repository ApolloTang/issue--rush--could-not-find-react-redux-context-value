require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: ['@myscope/eslint-config/src/eslint-configs/react.js'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true, //<----- https://stackoverflow.com/a/64488474/3136861
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2015,
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    // FIXME: fix rule violations
    // https://rewardops.atlassian.net/browse/MX-2146
    'testing-library/prefer-screen-queries': 'warn',
    'testing-library/no-node-access': 'warn',
    'testing-library/no-container': 'warn',
    'testing-library/no-await-sync-query': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
  },
};
