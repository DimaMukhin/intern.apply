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
  database: 'wq87o6l37jigk9p5'
});

/**
 * Connecting to the database
 */
conn.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

db.conn = conn;

/**
 * get all the jobs from db
 * @param  {Function} callback callback function (err, res, fields)
 */
db.getAllJobs = (callback) => {
  db.conn.query('SELECT * FROM job', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get filtered jobs from db
 * @param  {Function} callback callback function (err, res, fields)
 * @param  {Function} filter query to filter the jobs 
 */
db.getFilteredJobs = (filter, callback) => {
  conn.query('SELECT * FROM job WHERE title LIKE ?', ["%" + filter + "%"], (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add job to db
 * @param {Job} job to be added to the database 
 * @param {Function} callback callback function (err, res, fields)
 */
db.addJob = (job, callback) => {
  db.conn.query('INSERT INTO job SET ?', job, (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get all contact-us messages from the db
 * @param {*} callback 
 */
db.getAllContactMessages = (callback) => {
  db.conn.query('SELECT * FROM contactMessage', (err, res, fields) => {
    callback(err, res, fields);
  });
};

db.addNewContactMessage = (message, callback) => {
  db.conn.query('INSERT INTO contactMessage SET ?', message, (err, res, fields) => {
    callback(err, res, fields);
  });
};

module.exports = db;
