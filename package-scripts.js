module.exports = {
  scripts: {
    build: 'webpack',
    prettier: 'prettier --write "src/**/*.js"',
    test: {
      default: 'NODE_ENV=test jest',
      watch: 'NODE_ENV=test jest --watch',
      noCache: 'NODE_ENV=test jest --no-cache',
    },
  },
}
