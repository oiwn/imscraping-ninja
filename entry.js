/* eslint-env browser, node */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var wp = require('./webpack.config.js');
// var config = require('./config.loader');

// console.log(config());
var compiler = webpack(wp);
var server = new WebpackDevServer(compiler, {
  debug: true,
  hot: true,
  historyApiFallback: true,
  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {
    assets: true,
    colors: true,
    timings: true,
    version: false,
    chunks: false,
    chunkModules: true
  }
});
server.listen(3000, "localhost", function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at 0.0.0.0:3000');
});
