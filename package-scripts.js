module.exports = {
  scripts: {
    build: 'webpack',
    test: {
      default: 'NODE_ENV=test jest --no-cache',
      watch: 'NODE_ENV=test jest --watch --no-cache',
    },
  }
}
