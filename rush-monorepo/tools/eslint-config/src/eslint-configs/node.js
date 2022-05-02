require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['./base.js'],

  // [important]----------------------------------------------
  // 'parserOptions' must be located in package's eslintrc.js
  // so that eslint understand where the package boundary is.
  // ---------------------------------------------------------
  // parserOptions: {
  //   project: './tsconfig.json',
  //   createDefaultProgram: true, //<----- https://stackoverflow.com/a/64488474/3136861
  //   tsconfigRootDir: __dirname,
  //   sourceType: 'module',
  //   ecmaVersion: 2015
  // },

  env: {
    browser: false,
    node: true, // https://stackoverflow.com/questions/49789177/module-is-not-defined-and-process-is-not-defined-in-eslint-in-visual-studio-code
    es6: true,
  },

  rules: {},

  overrides: [
    {
      files: ['**/*.{ts}'],
      rules: {},
    },
    {
      files: ['**/*.{js}'],
      rules: {},
    },
  ],
};
