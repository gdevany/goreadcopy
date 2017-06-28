const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const testPath = path.resolve(__dirname, 'test');
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const dotenv = require('dotenv')
const CompressionPlugin = require('compression-webpack-plugin')
const failPlugin = require('webpack-fail-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')

process.env.dotenv_config_file ?
    dotenv.config({path: path.join(__dirname, process.env.dotenv_config_file)}) : dotenv.config()

module.exports = {
  bail: true,
  node: {
    fs: 'empty'
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
    failPlugin,
    new webpack.DefinePlugin({
      'process.env.SOCKET_URL' : JSON.stringify(process.env.SOCKET_URL),
      'process.env.API_URL' : JSON.stringify(process.env.API_URL),
      'process.env.REDIRECT_BASE_URL' : JSON.stringify(process.env.REDIRECT_BASE_URL),
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
      'process.env.SESSION_COOKIE_DOMAIN' : JSON.stringify(process.env.SESSION_COOKIE_DOMAIN),
      'process.env.PORT' : JSON.stringify(process.env.PORT),
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'client'},
    ], path.resolve(__dirname, 'src')),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true
    }),
    new HtmlWebpackPlugin({
        hash: false,
        showErrors: true,
        title: 'GoRead',
        template: 'src/client/index.ejs',
        chunksSortMode: 'dependency',
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
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: [nodeModulesPath, testPath],
      },
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
}
