const expect = require('chai').expect;
const mysql = require('mysql2');

const db = require('../database/db.service');

before(() => {
    db.conn = mysql.createConnection({
        host: "fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "rziicv90jjsju3xj",
        password: "eso1lssuop8145gk",
        database: 'x9ptoxf7hkxdbkme'
    });

    db.conn.connect((err) => {
        if (err) throw err;
    });
});

after(() => {
    db.conn.end();
});
