// Webpack builds/instantiates the app locally, so we must add CICD config support to both webpack config files
require('dotenv').config({path: './.env'});

const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  // resolves webpack + dotenv issue
  node: {
    fs: "empty"
  },
  resolve: {
    modules:  ['node_modules'],
    alias: {
      'foundation': path.join(nodeModulesPath, 'foundation-sites/dist/css')
    }
  },
  // project entry points
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, '/src/app/index.js'),
  ],
  devTool: 'eval',
  output: {
    filename: '[name].js',
    path: '/', // Not on the filesystem since webpackDevMiddleware builds in-memory
    // No publicPath needed because of webpackDevMiddleware defaults
  },
  plugins: [
    // CICD support for dynamically setting process variables to represent the env config
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify({ // EXAMPLES:
      BACKEND_SERVICE_BASE_URL: process.env.BACKEND_SERVICE_BASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      API_KEY: process.env.API_KEY,
      })
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // error warnings without stopping compiling
    new TransferWebpackPlugin([ // moves files
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
  ],
  externals: { // necessary for tests(when we create them) to run properly
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['eslint'],
        exclude: [nodeModulesPath, testPath],
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test: /\.(png|jpg)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
    ],
  }
};
