const webpack = require('webpack')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
    ],
    singleRun: true,
    frameworks: ['mocha'],
    files: ['webpack-test.config.js'],
    preprocessors: {
      'webpack-test.config.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/
          },
        ]
      },
      resolve: {
        root: __dirname,
        modulesDirectories: ['src/app', 'node_modules'],
      },
      plugins: [
        new webpack.DefinePlugin({
          // Add env vars here
          'process.env': {},
        }),
      ],
    },
    webpackServer: {
      noInfo: true,
    }
  })
}
