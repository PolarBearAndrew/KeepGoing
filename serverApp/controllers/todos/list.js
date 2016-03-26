
'use strict';

var debug = require('debug')('serverApp:todo.list');
var models = require('../../models/');

module.exports = (req, res) => {

	models.todos.findAll({
		where : {
			trashed : false,
		},
	})
	.then( todos => {
		todos = todos.map( todo => {
			return {
				id : todo.id,
				title : todo.title,
				desc : todo.desc || null,
				priority : todo.priority,
				needTime : todo.needTime,
				expectAt : todo.expectAt,
				endAt : todo.endAt,
				completed : todo.completed,
			};
		});
		res.return(todos);
	})
	.catch( err => {
		res.return(err);
	});

};
