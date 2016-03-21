
var debug = require('debug')('serverApp:routers.apis');
// var controllers = require('../controllers/');
var express = require('express');
var router = express.Router();


router.use('/test', (req, res, next) => {
	console.log('123');
	res.send('success');
});


module.exports = router;
