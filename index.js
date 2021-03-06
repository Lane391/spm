var koa = require('koa'),
  mount = require('koa-mount'),
 router = require('koa-router'),
 static = require('koa-static'),
rewrite = require('koa-rewrite'),
   jade = require('koa-jade'),
    dao = require('./dao.js')

var app = koa(),
static_app = koa(),
static_public = koa()
// socket_app = koa()

// app.use(mount('/socket.io', socket_app))

static_app.use(static(__dirname + '/bower_components'))
static_public.use(static(__dirname + '/public'))

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
app.use(mount('/public', static_public))

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
}).
get('/user/repos', function *() {
  var self = this
  dao.
  user_repos(this.request.query.id).
  then(function(repositories) {
    self.body = self.render('user_repos', {repositories:repositories})
  })
})

.post('/message', function *() {
	
});

app.get('/user', function *() {
  // console.log(this.request.query.id);
  var self = this;
  dao.user_repos(this.request.query.id).then(function(repositories) {
    yield self.render('test', repositories);
  })
});

// require("./message").initialize(io)
require("./github_oauth").initialize(app)

app.listen(process.env.PORT || 3000);