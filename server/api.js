const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Connecting to database
 */
const db = "mongodb://admin:admin@ds245277.mlab.com:45277/heroku_1r1pwztj";
mongoose.Promise = require('bluebird');
mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err);
    }
});

// #4Ne3^k91%S1

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
