
// 'use strict';

var debug = require('debug')('serverApp:todo.completed');
var errors = require('../../configs/').errors;
var Promise = require('sequelize').Promise;
var models = require('../../models/');
var moment = require('moment');

module.exports = (req, res) => {

	models.todos.findOne({
		where : {
			id : req.params.id,
			trashed : false,
		},
	})
	.then( todo => {
		if(!todo) return Promise.reject(new Error(errors.TODO_NOT_FOUNT));
		if(todo.type != 'daily') {
			todo.completed = true;
			todo.endAt = moment();
		}
		else if(
			todo.type == 'daily' &&
			todo.counter >= 100
		) {
			todo.completed = true;
			todo.endAt = moment();
		}
		else {
			todo.counter = todo.counter + 1;
		}
		return todo.save();
	})
	.then( todo => {
		let data = {
			id : todo.id,
			completed : todo.completed,
			counter : todo.counter,
		};
		res.return(data);
	})
	.catch( err => {
		res.return(err);
	});

};
