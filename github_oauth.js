var http = require('http')
  , url = require('url')
  , qs = require('querystring')
  , github = require('octonode')
  , app = require("./app.js")
  , Q = require('q')
  , dao = require("./dao.js")

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

app.get('/github/oauth/', function *(next) {
  var query = this.query;
 
  self = this
  yield function () {
  	var deferred = Q.defer()
    github.auth.login(query.code, function (err, token) {
        if (err) {
        	self.status = 403
        	self.body = "error"
          console.error(err)
        } else {
	        require("./app.js").setToken(token)
          client = github.client(token)
	        self.status = 301
          client.me().info(function(err, data, h) {
            console.log("receive user info")
            client.me().repos(data.login, function(err, repo, h) {
              console.log("recive user repositories")

              dao.mongo_connect().then(function(db) {
                db.collection('spm')
                  .insert(repo, function(err, result) {
                  })
              })
              self.redirect("/")
              deferred.resolve()
            })
          })
	        
    		}
    		
    	})
    return deferred.promise
  }()
  // }
})

}