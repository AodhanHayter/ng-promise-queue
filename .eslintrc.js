module.exports = {
  env: {
    es6: true,
    'jest/globals': true,
    'angular/mocks': true,
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['jest', 'angular'],
  rules: {
    'comma-dangle': 0,
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
  },
}
