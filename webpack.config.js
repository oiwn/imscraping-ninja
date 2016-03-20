var path = require('path');
var webpack = require('webpack');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var data = require('./data');

var webpackConfig = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './entry.js'
  ],
  devServer: {
    hot: true,
    contentBase: './assets',
    historyApiFallback: true
  },
  output: {
    filename: 'bundle.js',
    // publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: ['', '.js', '.jsx', '.css']
};

// Server-side config
var serverSideWrapper = function(wpConf) {
  if (process.env.NODE_ENV !== 'client') {
    var config = {
      entry: [
        './entry.js'
      ],
      devServer: {
        contentBase: './assets'
      },
      plugins: [
        new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
      ]
    };
    return Object.assign(wpConf, config);
  }
  return wpConf;
};

console.log(serverSideWrapper(webpackConfig));

module.exports = serverSideWrapper(webpackConfig);
