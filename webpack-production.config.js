const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const dotenv = require('dotenv');
const CompressionPlugin = require('compression-webpack-plugin');
const failPlugin = require('webpack-fail-plugin');

dotenv.config() // pull .env into process.env if it exists

module.exports = {
  bail: true,
  node: {
    fs: 'empty'
  },
  resolve: {
    modules:  ['node_modules'],
    alias: {
      'foundation': path.join(nodeModulesPath, 'foundation-sites/dist/css')
    }
  },
  entry: [
    path.join(__dirname, '/src/app/index.js'),
  ],
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'public'),
    publicPath: '/public',
  },
  plugins: [
    failPlugin,
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify(process.env)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.(css|scss)$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
  ],
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
        test: /\.eot$/,
        loader: "file"
      },
      {
        test: /\.svg$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ],
  }
}
