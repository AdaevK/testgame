const path = require('path');
const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');

const config = require('./webpack.base.config');
const env = process.env.NODE_ENV || 'development';

module.exports = merge(config,
  env === 'development'
    ? {}
    : {
      plugins: [
        new AssetsPlugin({
          filename: 'assets-manifest.json',
          path: path.join(__dirname, '..', 'public'),
          prettyPring: true,
        }),
      ],
    },
);