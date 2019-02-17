const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.config');
const port = 8080;

Object.keys(config.entry).forEach((key) =>{
  config.entry[key].push(
    'webpack/hot/only-dev-server',
    `webpack-dev-server/client?http://localhost:${port}`,
  );
});

config.output.publicPath = '/assets/';

module.exports = merge(config, {
  devServer: {
    port,
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    quiet: false,
    lazy: false,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
