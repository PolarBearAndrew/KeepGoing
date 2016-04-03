
'use strict';

var debug = require('debug')('serverApp:todo.update');
var errors = require('../../configs/').errors;
var Promise = require('sequelize').Promise;
var models = require('../../models/');

module.exports = (req, res) => {

	debug('req.body', req.body);

	models.todos.findOne({
		where : {
			id : req.params.id,
			trashed : false,
		},
	})
	.then( todo => {
		if(!todo) return Promise.reject(new Error(errors.TODO_NOT_FOUNT));
		Object.keys(req.body).forEach( key => {
			todo[key] = req.body[key];
		});

		if(req.body.desc == '') {
			todo.desc = null;
		}

		return todo.save();
	})
	.then( todo => {
		res.return(todo.id);
	})
	.catch( err => {
		res.return(err);
	});

};
