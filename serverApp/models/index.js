
"use strict";

// var config = require('../config'); // 之後再處理
var Sequelize = require('sequelize');
var debug = require('debug')('serverApp:db');

// 相容性修正
Sequelize.Promise.prototype.complete = Sequelize.Promise.prototype.nodeify;

// 實例化
var instance = new Sequelize('keepGoing', 'root', 'root',
	{
		dialect : 'mysql',
		host : 'localhost',
		port : '8889',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		},
	}
);

// instance._ObjectFactory = function(name) {
//
// 	return {
// 		type : Sequelize.TEXT,
// 		allowNull : true,
// 		get : function()  {
// 			try {
// 				if(
// 					this.getDataValue(name) &&
// 					this.getDataValue(name) != ''
// 				) {
// 					return JSON.parse(this.getDataValue(name));
// 				} else {
// 					return null;
// 				}
// 			} catch (err) {
// 				throw err;
// 			}
// 		},
// 		set : function(obj) {
// 			return this.setDataValue(name, JSON.stringify(obj));
// 		},
// 	};
//
// };

// 讀取模組
var models = {
	sequelize : instance,
	_Sequelize : Sequelize,
};

[
	'todos'
].forEach(function(name) {
	if(name) {
		models[name] = require('./' + name)(instance, models);
	}
});

instance.sync().complete(function (err) {
	debug('資料庫同步完成');
	if(err) return throwError(err, '資料庫同步失敗');
});

function throwError(err, msg){
	debug(msg);
	console.error('========== 資料庫初始化錯誤 =========');
	console.error('%s\n%s\n%j', err, err.stack, err);
	console.error('========== 資料庫初始化錯誤 =========');
	return process.exit();
}

module.exports = models;
