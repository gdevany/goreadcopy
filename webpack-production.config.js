const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const dotenv = require('dotenv')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

process.env.dotenv_config_file ?
    dotenv.config({path: path.join(__dirname, process.env.dotenv_config_file)}) : dotenv.config()

module.exports = {
  bail: true,
  node: {
    fs: 'empty'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders'),
    ],
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
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(process.cwd(), 'public'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SOCKET_URL' : JSON.stringify(process.env.SOCKET_URL),
      'process.env.API_URL' : JSON.stringify(process.env.API_URL),
      'process.env.REDIRECT_BASE_URL' : JSON.stringify(process.env.REDIRECT_BASE_URL),
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
      'process.env.SESSION_COOKIE_DOMAIN' : JSON.stringify(process.env.SESSION_COOKIE_DOMAIN),
      'process.env.PORT' : JSON.stringify(process.env.PORT),
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        minimize: true,
        compress: {
          warnings: false,
        },
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'image', to: 'image'},
      {from: 'media', to: 'media'},
    ], path.resolve(__dirname, 'src/client')),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true
    }),
    new ExtractTextPlugin({filename: '[name].[chunkhash].css', allChunks: true}),
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
        hash: false,
        showErrors: true,
        template: 'src/client/index.ejs',
        chunksSortMode: 'dependency',
        // Variables
        title: 'GoRead',
        env: process.env.NODE_ENV,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
        if (chunk.name) {
            return chunk.name;
        }
        return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].js',
        minChunks: function (module) {
           // this assumes your vendor imports exist in the node_modules directory
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        filename: 'runtime.[hash].js',
        minChunks: Infinity,
    }),
    new NameAllModulesPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.(css|scss)$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    //--------------------------------------------------
    // Only enable when you want to use the Analyzer!!!!
    //--------------------------------------------------
    //new BundleAnalyzerPlugin(),
  ],
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
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader', 'namespace-sass-loader']
        })
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
}
