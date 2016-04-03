
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
				type : todo.type,
				needTime : todo.needTime,
				expectAt : todo.expectAt,
				counter : todo.counter,
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
