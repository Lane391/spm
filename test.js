var io = require("socket.io-client")
var socket = io.connect("http://localhost:3000/")
socket.on("connect", function(a) {
	socket.on("chat", function(message) {
		console.log(message)
	})
})
socket.emit("chat", {hello2: "123"})