'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'web.js': __dirname + '/dev/Init.js',
  },
  output: {
    filename: '[name]',
    path: __dirname + '/build',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
          },
        ]),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
};
