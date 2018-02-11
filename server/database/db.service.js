/**
 * Database singleton service
 * Implements the database provider interface
 * uses callbacks for asynchronous calls
 */

const mysql = require('mysql2');
const config = require('../config');

let db = {};

/**
 * Setting up database connection
 */
let conn = mysql.createConnection({
  host: config.prod_db.host,
  user: config.prod_db.user,
  password: config.prod_db.password,
  database: config.prod_db.database
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

/**
 * get a job by id
 * @param {id} job id
 * @param  {Function} callback callback function (err, res, fields)
 */
db.getJob = (id, callback) => {
  db.conn.query('SELECT * FROM job where id = ?', id, (err, res, fields) => {
    callback(err, res, fields);
  })
};

module.exports = db;
