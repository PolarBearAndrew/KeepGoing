
var debug = require('debug')('serverApp:routers.apis');
var controllers = require('../controllers/');
var express = require('express');
var router = express.Router();

// todos
router.route('/todos').get(controllers.todos.list);
router.route('/todo').post(controllers.todos.create);
router.route('/todo/:id').put(controllers.todos.update);
router.route('/todo/:id/complete').put(controllers.todos.complete);
router.route('/todo/:id/undo').put(controllers.todos.undo);
router.route('/todo/:id').delete(controllers.todos.remove);

module.exports = router;
