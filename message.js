
exports.initialize = function(io) {
  io.on('connection', onConnection)
}

function onConnection(socket) {
  socket.join("room1")
  socket.on('chat', function (message) {
    socket.broadcast.to('room1').emit("chat", message)
  })
}