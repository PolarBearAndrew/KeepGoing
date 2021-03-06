
"use strict";

var Sequelize = require('sequelize');
var debug = require('debug')('serverApp:models:todos');

module.exports = function(sequelize, models) {

	var todos = sequelize.define('Todo', {

		title : {
			type : Sequelize.STRING,
			allowNull : false,
			validate : { notEmpty : true },
		},

		desc : {
			type : Sequelize.STRING,
			allowNull : true,
			validate : { notEmpty : true },
		},

		type : {
			type : Sequelize.STRING,
			defaultValue : 'none',
		},

		needTime : {
			type : Sequelize.INTEGER,
			defaultValue : 0,
		},

		counter : {
			type : Sequelize.INTEGER,
			defaultValue : 0,
		},

		expectAt : {
			type : Sequelize.DATE,
			allowNull : false,
			defaultValue : Sequelize.NOW,
			validate : { isDate : true }
		},

		endAt : {
			type : Sequelize.DATE,
			allowNull : null,
			validate : { isDate : true }
		},

		completed : {
			type : Sequelize.BOOLEAN,
			allowNull : false,
			defaultValue : false,
		},

		trashed : {
			type : Sequelize.BOOLEAN,
			allowNull : false,
			defaultValue : false,
		},

	}

	);

	return todos;

};
