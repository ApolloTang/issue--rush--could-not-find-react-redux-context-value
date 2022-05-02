require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  plugins: ['@typescript-eslint', 'simple-import-sort'],

  extends: [
    // Endable eslint's inbuilt "recommended" config - it turns on a small,
    // sensible set of rules which lint for well-known best-practices.
    // Eslint Recommended are listed in: https://eslint.org/docs/rules/
    'eslint:recommended',

    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],

  settings: {
    jest: {
      version: 'detect', // <--- https://github.com/microsoft/vscode-eslint/issues/1145#issuecomment-780130183
    },
  },

  parser: '@typescript-eslint/parser', // Enable type aware linting with typescript-eslint/parser
  // [important]----------------------------------------------
  // 'parserOptions' must be located in package's eslintrc.js
  // so that eslint understand where the package boundary is.
  // ---------------------------------------------------------
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   createDefaultProgram: true, //<----- https://stackoverflow.com/a/64488474/3136861
  //   project: './tsconfig.json',
  //   ecmaVersion: 2019,
  //   sourceType: 'module',
  // },

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/', // Although we do not use 'build' as output folder name, we add this as a precaution
  ],

  rules: {
    // --------------------------------------
    // General
    // --------------------------------------

    // Disallow 'console.log', but console.{warn, error, info} is acceptable.
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    // This is not a recomended rules

    // --------------------------------------
    // Jest
    // --------------------------------------

    // Warn you that you are missing calling an 'expect' in a test (without an expect() a test is pointless).
    'jest/expect-expect': 'warn',

    // --------------------------------------
    // Import
    // --------------------------------------

    'no-duplicate-imports': 'error',

    // Configuration for simple-import-sort/imports
    'sort-imports': 'off', // required, turn off for simple-import-sort plugin to work'
    'simple-import-sort/imports': [
      'off',
      {
        groups: [
          ['^\\u0000'], // Side effect, eg: import('some-polyfill'), it dectect null characters b/c 'from' is missing
          ['^react', '^@?\\w'], // 3rd party library, react come first, Scoped libraries next
          ['^(@mycompany|@myscope)(/.*|$)'], // Company's scoped packages
          [
            // Order of various import patterns
            '^(~.+)(/.*|$)',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          ['^.+\\.css$'], // Style imports
        ],
      },
    ],
  },

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],

      extends: [
        // @typescript-eslint and eslint has overlaping rules;
        // to use @typescript-eslint we need to turn off the some
        // of the rules endable by eslint:recommended.
        // These disabled rules are listed in:
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        'plugin:@typescript-eslint/eslint-recommended',

        // Typescript officially recommended a set of rule, we
        // will adopt these recommendations.
        // These rules are marked with ✅ in:
        //   https://typescript-eslint.io/rules/
        // Link to actual source code:
        //   https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        'plugin:@typescript-eslint/recommended',

        // Enable type aware linting. It uses tsconfig.json
        // specified in package's eslintrc.js. Rules are listed in:
        //   https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      rules: {
        // ------------------------------------------
        // required work around
        // ------------------------------------------

        // For consistency this rule should be off.
        // This is a required setting, see:
        //     https://github.com/typescript-eslint/typescript-eslint/issues/50
        '@typescript-eslint/explicit-function-return-type': 'off',
        // This rule warn you that you have forgotten to annotate the return type
        // of a function; but usually typescript is able to figure out the
        // return type of a function, so there is unnecessary.

        // Spacing arround annotation is disable so that it is not
        // conflicting with:
        //   eslint-plugin-prettier
        //   eslint-config-prettier
        // See:
        //   https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
        '@typescript-eslint/type-annotation-spacing': 'off',

        // ------------------------------------------
        // Rules of forgivness,
        // forgive you for breaking rules.
        // ------------------------------------------

        // We should avoid using '@ts-ignore'; instead,
        // please use '@ts-expect-error'.
        '@typescript-eslint/ban-ts-comment': 'warn',

        // -------------------------------------------
        // Rules not recommended officially but
        // enforcements or relax for spacific reason
        // -------------------------------------------

        // Allow use of 'require' statement outside import statements.
        // This is necessary when mock module multiple times with different values, see:
        //   https://stackoverflow.com/questions/49650323/jest-mock-module-multiple-times-with-different-values
        // And also to get webpack bundle fonts, see: TODO referece required.
        '@typescript-eslint/no-var-requires': 'off',
        // Recommended rule is 'error'
      },
    },
    // JavaScript files
    {
      files: ['**/*.{js,jsx}'],
    },
  ],
};
