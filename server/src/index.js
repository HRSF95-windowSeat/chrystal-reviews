const port = 8081;
const bodyParser = require('body-parser');
const path = require('path');

// const db = require('../../databases/mysql/index');
const db = require('../../databases/postgres/index');

const express = require('express');
const app = express();

app.use(bodyParser.json());

// app.use("/", function(req, res, next) {
//   console.log("the request URL is " + req.url);
//   next();
// });

// app.use('/reviewsBundle.js', express.static(path.join(__dirname + '../../../client/dist/bundle.js')));
// app.use('/reviewsMain.css', express.static(path.join(__dirname + '../../../client/styles/main.css')));

// app.get('/restaurant/:restaurantId', (req, res) => {
//   express.static( path.resolve(__dirname, '../../client/index.html') )
// });

app.use('/restaurant/:restaurantId', express.static( path.resolve(__dirname, '../../client') ));

app.get('/restaurant/:restaurantId/reviews', (req, res) => {
  db.getAllReviews(req.params.restaurantId, (err, results) => {
    if (err) {res.status(500).send(err)}
    else {
      console.log(results)
      res.status(200).send(results.rows);
    }
  });
});

app.listen(port, () => console.log(`CavaTable is listening on port ${port}`));