/* eslint-env browser, node */
/* globals module require */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
// var websiteData = require('./website.config.js');

var webpackConfig = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3030',
    './client.jsx'
  ],
  devServer: {
    hot: true,
    contentBase: './build',
    historyApiFallback: false
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd'
  },
  target: "web",
  progress: true,

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules')
      },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(
    //       process.env.NODE_ENV ? process.env.NODE_ENV : 'production')
    //   }
    // }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: ['', '.js', '.jsx', '.css', '.json']

  // resolve: {
  //   root: [
  //     path.resolve(__dirname)
  //   ],
  //   modulesDirectories: [
  //     `node_modules`
  //   ],
  //   extensions: ['', '.js', '.jsx', '.css']
  // }
};

// Server-side config
var webpackServerConfig = function(webpackConfig) {
  require("babel-register");  // to import jsx files
  var paths = require('./routes.jsx').allPaths;
  if (process.env.NODE_ENV !== 'client') {
    var config = {
      target: 'node',
      entry: [
        './entry.jsx'
      ],
      devServer: {
        contentBase: './assets'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(
              process.env.NODE_ENV ? process.env.NODE_ENV : 'production')
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new StaticSiteGeneratorPlugin(
          'bundle.js', paths, websiteData)
      ]
    };
    return Object.assign(wpConf, config);
  }
  return wpConf;
};

module.exports = webpackConfig;

// module.exports = {
//   webpackConfig: webpackConfig,
//   webpackServerConfig: webpackServerConfig
// }
