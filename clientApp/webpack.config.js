var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      query: {
        optional: ['runtime'],
        cacheDirectory: true,
        stage: 0
      }
    }],
  },

};

