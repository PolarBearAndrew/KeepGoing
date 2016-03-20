var os = require('os');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);

// app.use('/img', express.static('./dist/img'));
// app.use('/locales', express.static('./dist/locales'));
app.use('/assets/', express.static('./dist/assets'));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	console.log('use this router');
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8080, '0.0.0.0', function(err) {
	if(err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:8080');
});
