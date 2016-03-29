
module.exports = {
	db : {
		user : 'root',
		password : 'root',
		dialect : 'mysql',
		host : 'localhost',
		port : '8889',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		},
	}
};
