
var _ = require('lodash');
var async = require('async');
var models = require('../../models/');
var debug = require('debug')('serverApp:todo.create');

module.exports = (req, res, next) => {

	var todo;

	async.series([
		// validate,
		createTodo,
	], err => {
		if(err) return res.send(err);
		var str = JSON.stringify({ data : todo.id });
		return res.send(str);
	});

	function createTodo(callback) {
		var data = _.pick(req.body, [
			'title', 'desc', 'priority', 'needTime',
			'expectAt', 'endAt',
		]);
		models.todos.create(
			data, {validate: false}
		).complete(function(err, record){
			if(err) return callback(err);
			todo = record;
			return callback();
		});
	}

};
