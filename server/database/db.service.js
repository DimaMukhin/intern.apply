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
 * adds a user to the database
 * @param   user user data model instance
 * @param  {Function} callback callback function (err, res, fields)
 *
 */
db.addUser = (user, callback) => {
    const query = `INSERT INTO user (name, email, password) 
    VALUES ('${user.username}', '${user.email}', '${user.password}')`;

    conn.query(query, (err, res) => {
        callback(err,res);
    });
};

module.exports = db;
