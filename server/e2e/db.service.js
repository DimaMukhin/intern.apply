const mysql = require('mysql2');
const config = require('../config');

let db = {};

/**
 * Setting up database connection
 */
let conn = mysql.createConnection({     
    host: config.test_db.host,
    user: config.test_db.user,
    password: config.test_db.password,
    database: config.test_db.database,
    multipleStatements: true
});

db.conn = conn;

module.exports = db;