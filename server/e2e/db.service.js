const mysql = require('mysql2');
const config = require('../config');

let db = {};

/**
 * Setting up database connection
 */
let conn = mysql.createConnection(config.test_db);

db.conn = conn;

module.exports = db;