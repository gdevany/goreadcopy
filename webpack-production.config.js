// Webpack builds/instantiates the app locally, so we must add CICD config support to both webpack config files
require('dotenv').config({path: './.env'});
const DotenvPlugin = require('webpack-dotenv-plugin');

const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  node: {
    fs: "empty"
  },
  entry: path.join(__dirname, '/src/app/index.js'),
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify({ // EXAMPLES:
      BACKEND_SERVICE_BASE_URL: process.env.BACKEND_SERVICE_BASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      API_KEY: process.env.API_KEY,
      })
    }),
    new webpack.optimize.UglifyJsPlugin({ // Minifies the bundle
      compress: {
        warnings: false, // suppresses warnings, usually from module minification
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: [ nodeModulesPath, testPath ],
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader'
      },
    ],
  }
};
