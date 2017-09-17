const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ngPromiseQueue.min.js',
    library: {
      root: 'ngPromiseQueue',
      amd: 'ng-promise-queue',
      commonjs: 'ng-promise-queue',
    },
    libraryTarget: 'umd',
  },
  externals: {
    'angular': {
      commonjs: 'angular',
      commonjs2: 'angular',
      amd: 'angular',
      root: 'angular',
    },
  },
  plugins: [
    new MinifyPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}


module.exports = config

