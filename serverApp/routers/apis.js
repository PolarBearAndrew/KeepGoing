
// var debug = require('debug')('serverApp:routers.apis');
var controllers = require('../controllers/');
var express = require('express');
var router = express.Router();

// todos
router.route('/todo').post(controllers.todos.create);
router.route('/todo').get(controllers.todos.list);

module.exports = router;
