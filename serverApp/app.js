var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models/');

var app = express();

var apis = require('./routers/apis.js');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.set('Content-Type', 'application/json');
	next();
});

app.use('/api/v1', apis);

app.use( (req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use( (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		status : err.status || 500,
		message : err.message,
		error : err
	});
});

app.listen(3001, () => {
	console.log('server is listening');
});

module.exports = app;
