var mongo = require("mongodb"),
        Q = require("q")

var _mongo_connection = null

exports.mongo_connect = function() {
	var deferred = Q.defer()

	mongo.MongoClient.connect("mongodb://127.0.0.1/spm", function(err, db) {
		console.log('connect to mongo')
		if (_mongo_connection) {
			deferred(_mongo_connection)
			return deferred.promise
		}

		if (err) {
			console.error(err)
			deferred.reject(err)
		} else {
			console.log("did connect mongo")
			deferred.resolve(db)
		}
	})
	return deferred.promise
}

exports.user_repos = function(user) {
	var deferred = Q.defer()
	exports.mongo_connect().then(function(db) {
		db.
			collection('user_repos').
			find({"owner.login": "gokush"}).
			toArray(function(err, repositories) {
				if (err)
					deferred.reject(err)
				else
					deferred.resolve(repositories)
			})
	})
	return deferred.promise
}