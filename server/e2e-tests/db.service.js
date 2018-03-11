const mysql = require('mysql2');

const db = require('../database/db.service');
const config = require('../config');

db.conn = mysql.createConnection({
    host: config.test_db.host,
    user: config.test_db.user,
    password: config.test_db.password,
    database: config.test_db.database
});

module.exports = db;

