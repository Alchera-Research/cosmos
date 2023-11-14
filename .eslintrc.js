module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  settings: {
    jest: {
      version: require('jest/package.json').version,
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  // extends: [
  //   'eslint:recommended',
  //   'airbnb-base',
  // ],
  // // globals: {
  // //   Atomics: 'readonly',
  // //   SharedArrayBuffer: 'readonly',
  // // },
  // parserOptions: {
  //   ecmaVersion: 2020,
  // },
  rules: {
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    // },
    // ],
  },
  plugins: [
    'jest',
  ],
  overrides: [
    {
      // preset: 'ts-jest',
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: [
        '@typescript-eslint',
        'jest',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
      ],
      // collectCoverage: true,
      rules: {
        /*
         note: '@typescript-eslint/no-unsafe-call':
          it's changes 'off' -> 'warn' because of 'uuid' module defined as 'any'
         */
        '@typescript-eslint/no-unsafe-call': 'warn',
        'max-len': ["error", {"code": 120}],
        'arrow-body-style': ["error", "as-needed"],
        'max-classes-per-file': ["error", 2],
        // 'function-paren-newline': ["error", { minItems: 5 }],
        'function-call-argument-newline': ["error", "consistent"],
        "padding-line-between-statements": [
          "error",
          {"blankLine": "always", "prev": "*", "next": "if"},
          {"blankLine": "always", "prev": "if", "next": "*"},
          {"blankLine": "always", "prev": "*", "next": "return"}
        ],
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
        // '@typescript-eslint/ban-ts-comment': 'off',
        // '@typescript-eslint/no-explicit-any': 'off',
        // 'jest/no-disabled-tests': 'warn',
        // 'jest/no-focused-tests': 'error',
        // 'jest/no-identical-title': 'error',
        // 'jest/prefer-to-have-length': 'warn',
        // 'jest/valid-expect': 'error',
        // 'import/no-extraneous-dependencies': 'off',
        // 'no-trailing-spaces': [
        //   'error',
        //   {
        //     skipBlankLines: true,
        // },
        // ],
        // 'no-unused-vars': [
        //   'error',
        //   {
        //     args: 'none',
        // },
        // ],
        // 'max-classes-per-file': [ 'error', 2 ],
        // // "max-lines-per-function": [ "error", 50 ],
        // 'lines-between-class-members': [
        //   'error',
        //   'always',
        //   { exceptAfterSingleLine: true },
        // ],
        // 'import/prefer-default-export': 'off',
      },
    }
  ],
};
