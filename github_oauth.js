var http = require('http')
  , url = require('url')
  , qs = require('querystring')
  , github = require('octonode')
  , app = require("./app.js")

exports.initialize = function(app) {

var authURL = github.auth.config({
  id: process.env.GITHUB_OAUTH_ID,
  secret: process.env.GITHUB_OAUTH_SECRET,
  }).login(['user', 'repo', 'gist'])
var state = authURL.match(/&state=([0-9a-z]{32})/i);

app.get('/github/oauth/login', function *() {
	this.status = 301
	this.redirect(authURL)
})

app.get('/github/oauth/', function *() {
  var values = qs.parse(this.query);
  // Check against CSRF attacks

  if (!state || state[1] != this.query.state) {
  	this.status = 403
  	this.body = "状态不正确"
    // res.writeHead(403, {'Content-Type': 'text/plain'});
  } else {
  	self = this
  	console.log("here")
    github.auth.login(values.code, function (err, token) {
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.end(token);
        console.log(token)
        require("./app.js").setToken(token)
        self.status = 301
        self.redirect("/")
    	})
  }
})

}