const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
	contactPoints: [ process.env.DB_HOST || 'localhost' ],
	keyspace: 'cava'
});

const postReview = function(post, callback) {
	const query = `INSERT INTO reviews (id,restaurant_id,username,date,overall_rating,food_rating,service_rating,ambiance_rating,value_rating,noise_level,recommended,body) VALUES (${post.id},${post.restaurant_id},'${post.username}','${post.date}',${post.overall_rating},${post.food_rating},${post.service_rating},${post.ambiance_rating},${post.value_rating},${post.noise_level},${post.recommended},'${post.body}');
	`;
	client.execute(query)
		.then( res => {
			callback(null, res);
		})
		.catch( err => console.log(err));
}

const getReviews = function(restaurantId, callback) {
	const query = `SELECT * FROM cava.reviews WHERE restaurant_id = ${restaurantId}`;
	client.execute(query)
		.then( res => {
			callback(null, res);
		})
		.catch( err => console.log(err));
}

const deleteReview = function(restaurantId, callback) {
	const query = `DELETE FROM reviews WHERE restaurant_id = ${restaurantId}`;
	client.execute(query)
		.then( res => {
			callback(null, res);
		})
		.catch( err => console.log(err));
}

module.exports = {
	postReview,
	getReviews,
	deleteReview
};