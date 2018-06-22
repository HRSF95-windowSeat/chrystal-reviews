const { Client, Pool } = require('pg');
const client = new Client();
const postgresConfig = require('./config.js');
const pool = new Pool(postgresConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

const getAllReviews = function(restaurantId, callback) {

	pool.connect((err, client, done) => {
		if (err) throw err
		client.query(`SELECT * FROM reviews WHERE restaurant_id=${restaurantId} LIMIT 1500`, (err, res) => {
			done();

			if (err) {
				console.log(err.stack)
			} else {
				callback(null, res);
				// console.log(res.rows)
			}
		})
	})
	
}

module.exports = {
  getAllReviews
};