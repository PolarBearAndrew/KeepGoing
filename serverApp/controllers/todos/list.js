
// var _ = require('lodash');
var async = require('async');
var models = require('../../models/');
var debug = require('debug')('serverApp:todo.list');

module.exports = (req, res, next) => {

	var todos;

	async.series([
		// validate,
		createTodo,
	], err => {
		if(err) return res.send(err);
		return res.send(todos);
	});

	function createTodo(callback) {
		models.todos.findAll({
			where : {
				trashed : false,
			},
		}).complete(function(err, records){
			if(err) return callback(err);
			todos = records;
			return callback();
		});
	}

};
