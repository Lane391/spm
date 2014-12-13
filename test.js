var io = require("socket.io-client")
var socket = io.connect("http://gkmessage-a1a6a.coding.io/")
socket.on("connect", function(a) {
	socket.on("chat", function(message) {
		console.log(message)
	})
})
socket.emit("chat", {hello2: "123"})