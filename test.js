var io = require("socket.io-client")
var socket = io.connect("http://gkmessage.coding.io/")
// var socket = io.connect("http://localhost:3000/")
socket.on("connect", function(a) {
	console.log("socket on connect")
	socket.on("chat", function(message) {
		console.log(message)
	})
	socket.emit("chat", {"body": "i am cj"})
})
