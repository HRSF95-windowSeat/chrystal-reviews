require('newrelic');

const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const path = require('path');

const redis = require('redis');
const client = redis.createClient();

// const db = require('../../databases/mysql/index');
// const db = require('../../databases/postgres/index');
const db = require('../../databases/cassandra/index');

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use('/restaurant/:restaurantId', express.static( path.resolve(__dirname, '../../client') ));

app.post('/restaurant/:restaurantId/reviews', (req, res) => {
  db.postReview(req.body, () => {
    res.status(200).end();
  });
});

const cache = (req, res, next) => {
  const id = req.params.restaurantId;
  client.get(id, (err, data) => {
    if ( err ) {
      throw err;
    }
    if ( data != null ) {
      res.status(200).send(JSON.parse(data));
    } else {
      next();
    }
  });
}
const queryDatabase = (req, res, next) => {
  db.getReviews(req.params.restaurantId, (err, results) => {
    if (err) {res.status(500).send(err)}
    else {
      client.setex(req.params.restaurantId, 3600, JSON.stringify(results.rows));
      res.status(200).send(results.rows);
    }
  });
}
app.get('/restaurant/:restaurantId/reviews', cache, queryDatabase);

app.put('/restaurant/:restaurantId/reviews', (req, res) => {
});

app.delete('/restaurant/:restaurantId/reviews', (req, res) => {
  db.deleteReview(req.params.restaurantId, (err, results) => {
    if (err) {res.status(500).send(err)}
    else {
      client.del(req.params.restaurantId);
      res.status(200).send();
    }
  });
});

if ( !module.parent ) {
  const server = app.listen( port, 
    () => console.log(`CavaTable is listening on port ${port}`));
}
module.exports = app;