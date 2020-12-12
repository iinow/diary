module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    semi: 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-return-assign': 'off',
    'import/no-unresolved': 'off',
    'prettier/prettier': 'error',
    'prefer-spread': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  overrides: [
    {
      extends: ['plugin:cypress/recommended'],
      files: ['cypress/**/*'],
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
    },
    // {
    //   files: ['*.svelte'],
    //   processor: 'svelte3/svelte3',
    // }
  ],
  ignorePatterns: ['*.svelte', 'node_modules/*'],
}
