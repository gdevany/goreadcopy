const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const TransferWebpackPlugin = require('transfer-webpack-plugin')

module.exports = {
  node: {
    fs: 'empty'
  },
  resolve: {
    modules:  ['node_modules'],
    alias: {
      'foundation': path.join(nodeModulesPath, 'foundation-sites/dist/css')
    }
  },
  entry: path.join(__dirname, '/src/app/index.js'),
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'public'),
    publicPath: '/public',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        REDIRECT_BASE_URL: process.env.REDIRECT_BASE_URL,
        API_URL: process.env.API_URL,
      })
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(png|jpg)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  }
}
