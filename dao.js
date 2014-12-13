var mysql = require("mysql")
var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST || '127.0.0.1',
  database : process.env.MYSQL_DATABASE || 'gkmessage',
  user     : process.env.MYSQL_USERNAME || 'root',
  password : process.env.MSYQL_PASSWORD || '',
  port : process.env.MYSQL_port || 3306
})

connection.connect(function(error) {
	if (error)
		console.log(error)
	console.log('mysql connected')
})

exports.save_message = function(message, callback) {
	QUERY_INSERT_MESSAGE = 'INSERT INTO `gkmessage` (`body`) VALUES (?);';
	console.log(QUERY_INSERT_MESSAGE)
	connection.query(QUERY_INSERT_MESSAGE,
		[JSON.stringify(message)], function(error, rows, fields) {
			if (error)
				console.log(error)
			callback(rows)
		})
}

exports.messages = function(page, callback) {
	connection.query('SELECT * FROM `gkmessage` ORDER BY id DESC' + 
		' LIMIT ?,10', [(page - 1) * 20],

		function(error, rows, fields) {
			callback(rows)
		})
}