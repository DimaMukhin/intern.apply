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
 * @param {Function} callback callback function (err, res, fields)
 */
db.getAllContactMessages = (callback) => {
  db.conn.query('SELECT * FROM contactMessage', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add a new contact message to the database
 * @param {any}       message   the message to add  
 * @param {Function}  callback  callback function (err, res, fields)
 */
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

/**
 * get allcomments from the db
 * @param {Function} callback callback function (err, res, fields)
 */
db.getAllComments = (callback) => {
  db.conn.query('SELECT * FROM comment', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add a new comment to the database
 * @param {any}       comment   the comment to add  
 * @param {Function}  callback  callback function (err, res, fields)
 */
db.addNewComment = (comment, callback) => {
  db.conn.query('INSERT INTO comment SET ?', comment, (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get all comments of a job by its id
 * @param {number}  jobID     the id of the job 
 * @param {any}     callback  callback function (err, res, fields)
 */
db.getAllCommentsOfJob = (jobID, callback) => {
  db.conn.query('SELECT * FROM comment WHERE jobID = ?', jobID, (err, res, fields) => {
    callback(err, res, fields);
  });
};

db.getAllSurveyQuestions = (callback) => {
  conn.query('SELECT * FROM surveyQuestion ORDER BY questionIndex', (err, res, fields) => {
    callback(err, res, fields);
  });
};

db.getAllSurveyResponses = (callback) => {
  conn.query('SELECT * FROM surveyResponse', (err, res, fields) => {
    callback(err, res, fields);
  });
};

db.addCompleteSurvey = (callback) => {
  conn.query('INSERT INTO completedSurvey SET completionTime = CURDATE()', (err, res, fields) => {
    callback(err, res, fields);
  });
};

db.addCompleteSurveyRes = (surveyID, index, response, callback) => {
  conn.query('INSERT INTO completedSurveyRes SET surveyID = ?, questionIndex = ?, response = ?', [surveyID, index, response], (err, res, fields) => {
    callback(err, res, fields);
  });
};

module.exports = db;
