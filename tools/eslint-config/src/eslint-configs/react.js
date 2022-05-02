require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  plugins: [
    'react',
    'react-hooks',
    'testing-library',
    // 'jsx-ally', // <-- Do not add this line.
    //                    Some how specify jsx-ally plugin result in error message:
    //                    'ESLint couldn't find the plugin "eslint-plugin-jsx-ally".'
  ],

  extends: [
    './base.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  // [important]----------------------------------------------
  // 'parserOptions' must be located in package's eslintrc.js
  // so that eslint understand where the package boundary is.
  // ---------------------------------------------------------
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },

  settings: {
    react: {
      version: 'detect',
    },
  },

  env: {
    browser: true,
    node: true, // https://stackoverflow.com/questions/49789177/module-is-not-defined-and-process-is-not-defined-in-eslint-in-visual-studio-code
    es6: true,
  },

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-uses-react': 'error', // https://github.com/eslint/eslint/issues/11183
    'react/jsx-uses-vars': ['error'], // https://github.com/eslint/eslint/issues/8226
    'react/display-name': 'warn', // https://github.com/yannickcr/eslint-plugin-react/issues/597
  },

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {},
    },
    {
      files: ['**/*.{js,jsx}'],
      rules: {},
    },
  ],
};
