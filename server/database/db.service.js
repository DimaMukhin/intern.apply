/**
 * Database singleton service
 * Implements the database provider interface
 * uses callbacks for asynchronous calls
 */

const mysql = require('mysql2');
const config = require('../config');

let db = {};

config.db = (process.argv.length > 2 && process.argv[2] == 'test') ? config.test_db : config.prod_db;

/**
 * Setting up database connection
 */
let conn = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
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
  db.conn.query('SELECT * FROM job WHERE title LIKE ? OR organization LIKE ? OR location LIKE?', [["%" + filter + "%"], ["%" + filter + "%"], ["%" + filter + "%"]], (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add job to db
 * @param {any} job to be added to the database
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
 * @param {number} id job id
 * @param  {Function} callback callback function (err, res, fields)
 */
db.getJob = (id, callback) => {
  db.conn.query('SELECT * FROM job where id = ?', id, (err, res, fields) => {
    callback(err, res, fields);
  })
};

/**
 * get job rating
 * @param {number} jobId
 * @param  {Function} callback callback function (err, res, fields)
 */
db.getJobRating = (jobId, callback) => {
  db.conn.query('SELECT * FROM jobRating where jobId = ?', jobId, (err, res, fields) => {
    callback(err, res, fields);
  })
};

/**
 * rate a job
 * @param {number} jobId
 * @param {number} score job's score from 1-5
 * @param {number} votes number of votes
 * @param  {Function} callback callback function (err, res, fields)
 */
db.rateJob = (jobId, score, votes, callback) => {
  db.conn.query('INSERT INTO jobRating VALUES(?) ON DUPLICATE KEY UPDATE score = ?, votes = ?', [[jobId, score, votes], score, votes],
    (err, res, fields) => {
      callback(err, res, fields);
    });
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
 * add salary to a job by its id
 * @param {number}  jobID     the id of the job
 * @param {number}  salary    the salary of the job
 * @param {any}     callback  callback function (err, res, fields)
 */
db.addSalaryToJob = (id, salary, callback) => {
  db.conn.query('Select salary, numSalaries From job where id = ?', id, (err, res, fields) => {
    newNumOfSalaries = res[0]["numSalaries"] + 1;
    newSalary = (salary + (res[0]["salary"] * res[0]["numSalaries"])) / (newNumOfSalaries);
    newSalary = newSalary.toFixed(1);
    db.conn.query('Update job SET salary = ?, numSalaries = ? where id = ?',
      [newSalary, newNumOfSalaries, id], (err, res, fields) => {
        callback(err, res, fields, newSalary, newNumOfSalaries);
      });
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

/**
 * get all questions and allowed responses of the survey, the responses are appended together, seperated by ; character
 * @param {Function} callback callback function (err, res, fields)
 */
db.getAllSurveyQuestions = (callback) => {
  db.conn.query("SELECT *, " +
    "GROUP_CONCAT(r.response ORDER BY r.id SEPARATOR ';') AS responses FROM surveyResponse r " +
    "JOIN surveyQuestion q ON q.questionType = r.questionType " +
    "GROUP BY q.question " +
    "ORDER BY q.questionIndex", (err, res, fields) => {
      callback(err, res, fields);
    });
};

/**
 * get all completed surveys from the db
 * @param {Function} callback callback function (err, res, fields)
 */
db.getAllCompleteSurvey = (callback) => {
  db.conn.query('SELECT * FROM completedSurvey', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get the responses for a completed survey from the db
 * @param {number}  surveyID  the id of the completed survey 
 * @param {Function} callback callback function (err, res, fields)
 */
db.getCompleteSurveyRes = (surveyID, callback) => {
  db.conn.query('SELECT * FROM completedSurveyRes WHERE surveyID = ?', surveyID, (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add a new completed survey to the database
 * @param {any} callback  callback function (err, res, fields)
 */
db.addCompleteSurvey = (callback) => {
  db.conn.query('INSERT INTO completedSurvey SET completionTime = CURDATE()', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * record the actual responses to a completed survey to the database
 * @param {number}  surveyID  the id of the completed survey 
 * @param {number}  index  the index of the question responded to
 * @param {any}     response  the text of the response
 * @param {any}     callback  callback function (err, res, fields)
 */
db.addCompleteSurveyRes = (surveyID, index, response, callback) => {
  db.conn.query('INSERT INTO completedSurveyRes SET surveyID = ?, questionIndex = ?, response = ?', [surveyID, index, response], (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get all Q&A questions asked from the database
 * @param {Function} callback callback function (err, res, fields)
 */
db.getAllQuestions = (callback) => {
  db.conn.query('SELECT * FROM question ORDER BY creationTime DESC', (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * add a new question to the database
 * @param {any}       question  the question to add  
 * @param {Function}  callback  callback function (err, res, fields)
 */
db.addNewQuestion = (question, callback) => {
  db.conn.query('INSERT INTO question SET ?', question, (err, res, fields) => {
    callback(err, res, fields);
  });
};

/**
 * get a Q&A question by id
 * @param   {number}    question  the id of the question
 * @param   {Function}  callback  callback function (err, res, fields)
 */
db.getQuestionById = (question, callback) => {
  db.conn.query('SELECT * FROM question where id = ?', question, (err, res, fields) => {
    callback(err, res, fields);
  });
};

module.exports = db;
