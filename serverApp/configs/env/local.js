
module.exports = {
	db : {
		user : 'root',
		password : 'root',
		define : {
			charset : "utf8mb4",
			collate : "utf8mb4_general_ci"
		},
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
