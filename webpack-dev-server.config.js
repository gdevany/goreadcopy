// Webpack builds/instantiates the app locally, so we must add CICD config support to both webpack config files
//require('dotenv').config({path: './.env'});

const webpack = require('webpack')
const path = require('path')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const testPath = path.resolve(__dirname, 'test')

dotenv.config() // pull .env into process.env if it exists

module.exports = {
  node: {
    fs: "empty"
  },
  resolve: {
    modules:  ['node_modules'],
    alias: {
      'foundation': path.join(nodeModulesPath, 'foundation-sites/dist/css'),
      'soundmanager2': path.join(nodeModulesPath, 'soundmanager2/script/soundmanager2-nodebug-jsmin.js'),
    }
  },
  entry: [
    path.join(__dirname, '/src/app/index.js'),
  ],
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 3001,
    hot: true,
    open: true,
  },
  /*
  devtool: 'inline-source-map',
  */
  output: {
    filename: '[name].[hash].js',
    path: '/', // Not on the filesystem since webpackDevMiddleware builds in-memory
    // No publicPath needed because of webpackDevMiddleware defaults
    publicPath: '/',
  },
  plugins: [
    // CICD support for dynamically setting process variables to represent the env config
    new webpack.DefinePlugin({
      'process.env.SOCKET_URL' : JSON.stringify(process.env.SOCKET_URL),
      'process.env.API_URL' : JSON.stringify(process.env.API_URL),
      'process.env.REDIRECT_BASE_URL' : JSON.stringify(process.env.REDIRECT_BASE_URL),
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
      'process.env.SESSION_COOKIE_DOMAIN' : JSON.stringify(process.env.SESSION_COOKIE_DOMAIN),
      'process.env.PORT' : JSON.stringify(process.env.PORT),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // error warnings without stopping compiling
    new TransferWebpackPlugin([ // moves files
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
    new FaviconsWebpackPlugin({
        logo: path.join(__dirname + '/src/client/image/favicon.png'),
        prefix: 'icons-[hash]/',
        emitStats: false,
        statsFilename: 'iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#fff',
        title: 'GoRead',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
    }),
    new HtmlWebpackPlugin({
        // Params
        alwaysWriteToDisk: true,
        template: 'src/client/index.ejs',
        filesname: 'index.html',
        showErrors: true,
        // Variables
        title: 'GoRead',
        env: process.env.NODE_ENV,
    }),
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'src/client')
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[hash].js',
        minChunks: function (module) {
           // this assumes your vendor imports exist in the node_modules directory
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    //--------------------------------------------------
    // Only enable when you want to use the Analyzer!!!!
    //--------------------------------------------------
    //new BundleAnalyzerPlugin(),
  ],
  /*
  externals: { // necessary for tests(when we create them) to run properly
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot-loader', 'babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      }
    ],
  }
};
