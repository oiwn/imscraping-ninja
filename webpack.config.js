const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const CSS_LOADER_CONFIG = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: ['node_modules', 'node_modules/@material', './src/scss']
    }
  }
];


const webpackConfig = {
  target: "web",
  devtool: "source-map",
  entry: ['./src/js/index.js', './src/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, 'site/static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1',
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: CSS_LOADER_CONFIG,
        })
      }
    ]
  },
  resolve: {
    // modules: [
    //   'node_modules',
    //   'src/scss',
    // ],
    extensions: [".scss", ".css", ".js"]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'bundle.css',
      allChunks: true,
    }),
  ],
};

module.exports = webpackConfig;
