/**
 * Database singleton service
 * Implements the database provider interface
 * uses callbacks for asynchronous calls
 */

const mysql = require('mysql2');

let db = {};

/**
 * Setting up database connection
 */
let conn = mysql.createConnection({
  host: "vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ysl7tl8kom3eqlm6",
  password: "h9ax1h8bkk9v8qog",
  database : 'wq87o6l37jigk9p5'
});

/**
 * Connecting to the database
 */
conn.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

/**
 * get all the jobs from db
 * @param  {Function} callback callback function (err, res, fields)
 */
db.getAllJobs = (callback) => {
  conn.query('SELECT * FROM job', (err, res, fields) => {
    callback(err,res,fields);
  });
};

/**
 * add job to db
 * @param {Job} job to be added to the database 
 * @param {Function} callback callback function (err, res, fields)
 */
db.addJob = (job, callback) => {
  conn.query('INSERT INTO job SET ?', job, (err, res, fields) => {
    callback(err, res, fields);
  });
};

module.exports = db;
