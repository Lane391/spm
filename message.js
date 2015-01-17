// var dao = require("./dao.js")

// exports.initialize = function(io) {
  // io.on('connection', onConnection)


// function onConnection(socket) {
  // socket.join("room1")
  // dao.messages(1, function(rows) {
  // 	var msg = []
  // 	for (var i=0, size=rows && rows.length || 0; i < size; i++) {
  // 		var row = rows[i];
  // 		msg.push(row['body'])
  // 	}
  // 	io.to('room1').emit("chat", msg)
  // })
  // socket.on('chat', function (message) {
  // 	dao.save_message(message, function(rows) {
  // 	})
  //   socket.broadcast.to('room1').emit("chat", message)
  // })
// }
// }