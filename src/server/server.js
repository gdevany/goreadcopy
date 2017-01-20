const config = require('../../webpack-dev-server.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const app = express();
const path = require('path');
const compiler = webpack(config);
const port = process.env.PORT || 3001;

const serverOptions = {
  contentBase: 'http://localhost:' + port,
  port: process.env.PORT || 3001,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  historyApiFallback: true,
  stats: {colors: true}
};

app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler));
app.use(express.static('client'));

app.listen(port, function(err) {
  if(err) throw err;
  console.log("Listening on port", port)
})
