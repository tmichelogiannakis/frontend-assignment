const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  cache: false,
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 1234
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
});
