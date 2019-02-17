const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

module.exports = {
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? '#cheap-module-eval-source-map' : false,
  entry: {
    bundle: ['./src/application.js'],
  },
  output: {
    path: path.resolve(__dirname, '../public/assets'),
    filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
    library: '[name]',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    namedModules: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    noEmitOnErrors: true,
    concatenateModules: true,
  },
  performance: {
    hints: process.env.NODE_ENV === 'production'
      ? 'warning'
      : false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'bundle.css' : 'bundle.[hash].css',
    }),
    new FriendlyErrorsPlugin(),
  ],
}