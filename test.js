var io = require("socket.io-client")
var socket = io.connect("http://127.0.0.1:3000/")
socket.on("connect", function(a) {
	console.log("socket on connect")
	socket.on("chat", function(message) {
		console.log(message)
	})
	socket.emit("chat", {hello2: "123"})
})
