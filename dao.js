var mongo = require("mongodb"),
        Q = require("q")

exports.mongo_connect = function() {
	var deferred = Q.defer()

	mongo.MongoClient.connect("mongodb://127.0.0.1/spm", function(err, db) {
		console.log('connect to mongo')
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