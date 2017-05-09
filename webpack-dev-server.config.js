// Webpack builds/instantiates the app locally, so we must add CICD config support to both webpack config files
//require('dotenv').config({path: './.env'});

const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config() // pull .env into process.env if it exists

module.exports = {
  // resolves webpack + dotenv issue
  node: {
    fs: "empty"
  },
  eslint: {
    configFile: './.eslintrc'
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
  devtool: 'eval-source-map',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: '/', // Not on the filesystem since webpackDevMiddleware builds in-memory
    // No publicPath needed because of webpackDevMiddleware defaults
  },
  plugins: [
    // CICD support for dynamically setting process variables to represent the env config
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify(process.env)
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
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.(eot|mp3)$/,
        loader: "file"
      },
      {
        test: /\.svg$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ],
  }
};
