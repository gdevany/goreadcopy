// Webpack builds/instantiates the app locally, so we must add CICD config support to both webpack config files
require('dotenv').config({path: './.env'});

const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  // resolves webpack + dotenv issue
  node: {
    fs: "empty"
  },
  // project entry points
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/index.js'),
  ],
  devServer: {
    contentBase: 'src/client',
    devtool: 'eval',
    hot: true, // allows live reload
    inline: true,
    port: process.env.PORT || 3001,
    host: 'localhost', // Change to '0.0.0.0' for external facing server,
    // true if want to access dev server from arbitrary url.
    // handy if you are using a html5 router.
    historyApiFallback: true
  },
    devtool: 'eval',
    output: {
    path: buildPath, // Path of output file
    filename: 'index.js', //name of output file
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
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ],
  }
};
