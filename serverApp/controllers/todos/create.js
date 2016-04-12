
'use strict';

var debug = require('debug')('serverApp:todo.create');
var models = require('../../models/');
var _ = require('lodash');

module.exports = (req, res) => {

	var data = _.pick(req.body, [
		'title', 'desc', 'type', 'needTime',
		'expectAt', 'endAt',
	]);

	models.todos.create(
		data, {validate: false}
	)
	.then( todo => {
		res.return(todo);
	})
	.catch( err => {
		res.return(err);
	});

};
