var mysql = require("mysql"),
        Q = require("q")
var pool = mysql.createPool({
  host     : process.env.MYSQL_HOST || '127.0.0.1',
  database : process.env.MYSQL_DATABASE || 'gkmessage',
  user     : process.env.MYSQL_USERNAME || 'root',
  password : process.env.MSYQL_PASSWORD || '',
  port : process.env.MYSQL_port || 3306
})

function getConnection() {
	var deferred = Q.defer()
	pool.getConnection(function(error, connection) {
		if (error) {
			console.error(error)
			deferred.reject(new Error(error))
		}
		console.log('mysql connected')
		deferred.resolve(connection)
	})
	return deferred.promise
}

console.log("connect to mysql")

exports.save_message = function(message, callback) {
	QUERY_INSERT_MESSAGE = 'INSERT INTO `gkmessage` (`body`) VALUES (?);';

	getConnection()
	.then(function(connection) {
		console.log(QUERY_INSERT_MESSAGE)
		connection.query(QUERY_INSERT_MESSAGE,
			[JSON.stringify(message)], function(error, rows, fields) {
				if (error)
					console.log(error)
				callback(rows)
			})
	})
}

exports.messages = function(page, callback) {
	connection.query('SELECT * FROM `gkmessage` ORDER BY id DESC' + 
		' LIMIT ?,10', [(page - 1) * 20],

		function(error, rows, fields) {
			callback(rows)
		})
}