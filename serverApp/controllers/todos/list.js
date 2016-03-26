
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
		res.return(todos);
	})
	.catch( err => {
		res.return(err);
	});

};
