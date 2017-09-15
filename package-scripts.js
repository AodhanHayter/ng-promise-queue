module.exports = {
  scripts: {
    build: 'webpack',
    prettier: 'prettier --write "src/**/*.js"',
    lint: 'eslint "src/**/*.js"',
    test: {
      default: 'NODE_ENV=test jest --no-cache',
      watch: 'NODE_ENV=test jest --watch --no-cache',
      noCache: 'NODE_ENV=test jest --no-cache',
    },
  },
}
