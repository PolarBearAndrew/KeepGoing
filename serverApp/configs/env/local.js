
module.exports = {
	db : {
		user : 'root',
		password : 'root',
		define : {
			charset : "utf8mb4",
			collate : "utf8mb4_general_ci"
		},
		dialect : 'mysql',
		host : 'localhost', // local
		port : '8889',
		// host : '192.168.99.100', // docker
		// port : '3306',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		},
	}
};
