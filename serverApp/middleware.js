
'use strict';

var responseTime = require('response-time');

module.exports = function(app) {

	app.use(responseTime());

	app.response.return = function(obj) {
		var self = this;
		if(obj instanceof Error) {
			// 設定 statusCode
			if (obj.statusCode) {
				self.status(obj.statusCode);
			} else {
				self.status(200);
			}
			// build err object
			let errObject = {
				message : obj.message,
				name : obj.name,
				stack : typeof(obj.stack) === 'string'
						? obj.stack.split('\n').slice(0, 20)
						: obj.stack,
				method : obj.method,
				resource : obj.resource,
			};
			// send
			self.json({ error: errObject });
		} else {
			//// 封裝
			let result = { data : obj };
			let data = JSON.stringify(result);
			self.set('Content-Type', 'application/json; charset=utf-8');
			self.send(data);
		}
	};

};
