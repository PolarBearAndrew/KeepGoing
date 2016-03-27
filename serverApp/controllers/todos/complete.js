
// 'use strict';

var debug = require('debug')('serverApp:todo.update');
var errors = require('../../config/').errors;
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
		todo.completed = true;
		todo.endAt = moment();
		return todo.save();
	})
	.then( todo => {
		res.return(todo.id);
	})
	.catch( err => {
		res.return(err);
	});

};