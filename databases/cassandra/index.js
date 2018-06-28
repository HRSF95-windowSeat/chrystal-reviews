const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
	contactPoints: ['localhost'],
	keyspace: 'cava'
});

const getAllReviews = function(restaurantId, callback) {
	const query = `SELECT * FROM cava.reviews WHERE restaurant_id = ${restaurantId}`;
	client.execute(query)
		.then( res => {
			callback(null, res);
		});
}

module.exports = {
  getAllReviews
};