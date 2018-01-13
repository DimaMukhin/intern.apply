const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * Setting up database connection
 */
global.db = mysql.createConnection({
  host: "vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ysl7tl8kom3eqlm6",
  password: "h9ax1h8bkk9v8qog",
  database : 'wq87o6l37jigk9p5'
});

/**
 * Connecting to the database
 */
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

/**
 * API Health status
 */
router.get('/', (req, res) => {
  res.status(200).send('ok');
});

// setting up all api routes
require('./routes/employer.route')(router);

// development playground
// require('./playground');

module.exports = router;
