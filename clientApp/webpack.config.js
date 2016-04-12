var path = require('path');
var webpack = require('webpack');

module.exports = {

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'dist/public/js/'),
		filename: '[name].js',
		publicPath: '/public/js/'
	},

	entry:  {
		app: ['./src/index.js'],
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules)/,
				query: {
					optional: ['runtime'],
					cacheDirectory: true,
					stage: 0
				}
			},
		],
	},

};
