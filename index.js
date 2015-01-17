var koa = require('koa'),
  mount = require('koa-mount'),
 router = require('koa-router'),
 static = require('koa-static'),
rewrite = require('koa-rewrite'),
   jade = require('koa-jade')
    // dao = require('./dao.js')

var app = koa(),
static_app = koa()
// socket_app = koa()

// app.use(mount('/socket.io', socket_app))

static_app.use(static(__dirname + '/bower_components'))

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

// var server = require('http').Server(app.callback()),
//         io = require('socket.io')(server)

function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function *() {
	yield this.render('index', {})
})
.post('/message', function *() {
	
});

app.get('/user', function *() {
  console.log(this.request.query.id);
  yield this.render('test', { users: users });
});

// require("./message").initialize(io)
require("./github_oauth").initialize(app)

app.listen(process.env.PORT || 3000);