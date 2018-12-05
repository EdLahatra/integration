require("babel-core/register");
require("babel-polyfill");

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: ['babel-polyfill', './src/index.js',  path.resolve(__dirname, 'style.scss')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module : {
    rules: [{
      test: /\.(scss)$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => []
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(css)$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => []
        }
      }]
    }, {
      test : /\.js?/,
      include: [
        path.join(__dirname),
        path.join(__dirname, '..'),
        path.join(__dirname, '..', 'common')
      ],
      exclude: [/node_modules/],
      loader : 'babel-loader'
    }, {
      test: /\.(png|jpeg|eot|svg|woff2|woff|ttf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};

module.exports = config;
