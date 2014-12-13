var koa = require('koa'),
  mount = require('koa-mount'),
 router = require('koa-router'),
 static = require('koa-static'),
rewrite = require('koa-rewrite'),
   jade = require('koa-jade');

var app = koa(),
static_app = koa(),
socket_app = koa()

// app.use(mount('/socket.io', socket_app))

static_app.use(static(__dirname + '/bower_components'));

app.use(jade.middleware({
  viewPath: __dirname + '/views',
  debug: true,
  pretty: true,
  compileDebug: true,
  locals: {},
  basedir: __dirname + '/views',
  // helperPath: [
  //   'path/to/jade/helpers',
  //   { random: 'path/to/lib.js' },
  //   { _: require('lodash') }
  // ]
}))
app.use(router(app));
app.use(mount('/bower_components', static_app))

var server = require('http').Server(app.callback()),
        io = require('socket.io')(server)

app.get('/', function *() {
	yield this.render('index', {})
})
.post('/message', function *() {
	
});

io.on('connection', function(socket) {
  socket.join("room1")
  socket.on('chat', function (message) {
    socket.broadcast.to('room1').emit("chat", message)
  });
})

server.listen(process.env.PORT || 3000);