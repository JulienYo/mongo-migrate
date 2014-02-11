var mongodb = require('mongodb');

module.exports = {
	getConnection: getConnection
};

function getConnection(url, cb) {
	mongodb.connect(url, function(err, db) {
		if (!err) {
			db.on("error", function(problem) {
				logger.error("Unexpected error - "+problem.stack);
			});
		}
		var collection = new mongodb.Collection(db, 'migrations');
		cb(err, {
			connection: db,
			migrationCollection: collection
		});
	});
}