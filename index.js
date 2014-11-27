var koa = require('koa'),
  mount = require('koa-mount'),
 router = require('koa-router'),
 static = require('koa-static'),
rewrite = require('koa-rewrite'),
   jade = require('koa-jade');

var app = koa(),
static_app = koa();
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


app.get('', function *() {
	yield this.render('index', {})
})
.post('/message', function *() {
	
});
app.listen(process.env.PORT || 3000);