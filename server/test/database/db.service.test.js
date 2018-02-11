const expect = require('chai').expect;
const mysql = require('mysql2');

const db = require('../../database/db.service');

describe('db.service.js', () => {

    beforeEach(() => {
        db.conn = mysql.createConnection({
            host: "fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "rziicv90jjsju3xj",
            password: "eso1lssuop8145gk",
            database: 'x9ptoxf7hkxdbkme'
        });

        db.conn.connect((err) => {
            if (err) throw err;
        });

        db.conn.query('DROP TABLE IF EXISTS contactMessage', (err, res) => { });
        db.conn.query(`CREATE TABLE contactMessage (
            id INT NOT NULL AUTO_INCREMENT,
            email VARCHAR(45) NOT NULL,
            title VARCHAR(45) NOT NULL,
            message VARCHAR(300) NOT NULL,
            PRIMARY KEY (id))`);
        db.conn.query(`INSERT INTO contactMessage (id, email, title, message) VALUES 
            (1, 'dima@gmail.com', 'test title', 'test body'),
            (2, 'ben@gmail.com', 'second title', 'second body'),
            (3, 'what@is.this', 'third title', 'third body')`);

        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => { });
        db.conn.query(`CREATE TABLE job (
            id INT NOT NULL AUTO_INCREMENT,
            organization VARCHAR(45) NOT NULL,
            title VARCHAR(100) NOT NULL,
            location VARCHAR(45) NOT NULL,
            description VARCHAR(2000) NOT NULL,
            PRIMARY KEY (id))`);
        db.conn.query(`INSERT INTO job (id, organization, title, location, description) VALUES 
            (1, 'Test Org', 'test title', '123 test st', 'test description'),
            (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test'),
            (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description'),
            (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description')`);
    });

    describe('getAllContactMessages', () => {

        it('should return 3 contact message records', (done) => {
            db.getAllContactMessages((err, res, fields) => {
                expect(res).to.have.lengthOf(3);
                done();
            });
        });

        it('should return the correct first record', (done) => {
            db.getAllContactMessages((err, res, fields) => {
                let firstRecord = res[0];
                expect(firstRecord.id).to.equal(1);
                expect(firstRecord.email).to.equal('dima@gmail.com');
                expect(firstRecord.title).to.equal('test title');
                expect(firstRecord.message).to.equal('test body');
                done();
            });
        });
    });

    describe('addNewContactMessage', () => {

        it('should create a new contact message', (done) => {
            db.addNewContactMessage({ id: 4, email: 'test@email.com', title: 'test title 4', message: 'test body 4' }, (err, res, fields) => { });
            db.getAllContactMessages((err, res, fields) => {
                expect(res).to.have.lengthOf(4);
                done();
            });
        });

        it('should not create a new contact message with an undefined email', (done) => {
            db.addNewContactMessage({ id: 4, email: undefined, title: 'test title 4', message: 'test body 4' }, (err, res, fields) => { });
            db.getAllContactMessages((err, res, fields) => {
                expect(res).to.have.lengthOf(3);
                done();
            });
        });

        it('should not create a new contact message with an already existing id', (done) => {
            db.addNewContactMessage({ id: 3, email: 'test@email.com', title: 'test title 4', message: 'test body 4' }, (err, res, fields) => { });
            db.getAllContactMessages((err, res, fields) => {
                expect(res).to.have.lengthOf(3);
                done();
            });
        });
    });

    describe('getJob', () => {

        it('it should get one job with the id 2', (done) => {
            db.getJob({ id: 2 }, (err, res, fields) => {
                expect(res).to.have.lengthOf(1);
                let job = res[0];

                expect(job.id).to.equal(2);
                done();
            });
        });

        it('it should not get a job with a non existent id', (done) => {
            db.getJob({ id: 999 }, (err, res, fields) => {
                expect(res).to.have.lengthOf(0);
                done();
            });
        });
    });
});