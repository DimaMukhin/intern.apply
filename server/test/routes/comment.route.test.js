const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('comment.route.js', () => {
    beforeEach((done) => {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res, fields) => { 
            db.conn.query(`CREATE TABLE job (
                id INT NOT NULL AUTO_INCREMENT,
                organization VARCHAR(45) NOT NULL,
                title VARCHAR(100) NOT NULL,
                location VARCHAR(45),
                description VARCHAR(2000),
                PRIMARY KEY (id))`,
            (err, res) => {
                db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
                    (1, 'Facebook', 'test title', 'winnipeg'),
                    (2, 'google', 'second title', 'vancouver'),
                    (3, 'CityOFWinnipeg', 'third title', 'location')`,
                (err, res) => {
                    db.conn.query('DROP TABLE IF EXISTS comment', (err, res) => {
                        db.conn.query(`CREATE TABLE comment (
                            id INT NOT NULL AUTO_INCREMENT,
                            jobID INT NOT NULL,
                            message VARCHAR(300) NOT NULL,
                            author VARCHAR(45) NOT NULL,
                            ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY (id),
                            FOREIGN KEY (jobID) REFERENCES job (id))`,
                        (err, res) => {
                            db.conn.query(`INSERT INTO comment (id, jobID, message, author) VALUES 
                                (1, 1, 'this is a nice comment body', 'dima'),
                                (2, 1, 'another comment for the same job', 'ben'),
                                (3, 2, 'this last comment is for job 2', 'rick')`,
                            (err, res) => {
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    afterEach((done) => {
        db.conn.query('DROP TABLE IF EXISTS comment', (err, res) => {
            db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
                done();
            });
        });
    });

    describe('GET /comment', () => {
        it('should return all existing comments', (done) => {
            request(app)
                .get('/api/comment')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                })
                .end(done);
        });

        it('should return the correct first comment', (done) => {
            request(app)
                .get('/api/comment')
                .expect(200)
                .expect(res => {
                    let firstComment = res.body[0];
                    expect(firstComment.jobID).to.equal(1);
                    expect(firstComment.message).to.equal('this is a nice comment body');
                    expect(firstComment.author).to.equal('dima');
                })
                .end(done);
        });
    });

    describe('POST /comment', () => {
        it('should create a new comment', (done) => {
            request(app)
                .post('/api/comment')
                .send({ jobID: 1, message: 'testtitle', author: 'bibi' })
                .expect(200)
                .expect(res => {
                    expect(res.body.jobID).to.equal(1);
                    expect(res.body.message).to.equal('testtitle');
                    expect(res.body.author).to.equal('bibi');
                })
                .end(done);
        });

        it('should return an error message with code 4 for invalid job ID', (done) => {
            request(app)
                .post('/api/comment')
                .send({ jobID: 'test', message: 'testtitle', author: 'bibi' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(4);
                })
                .end(done);
        });

        it('should return an error message with code 5 for invalid message body', (done) => {
            request(app)
                .post('/api/comment')
                .send({ jobID: 1, message: '', author: 'bibi' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(5);
                })
                .end(done);
        });

        it('should return an error message with code 6 for invalid author name', (done) => {
            request(app)
                .post('/api/comment')
                .send({ jobID: 1, message: 'test', author: '' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(6);
                })
                .end(done);
        });

        it('should retur an error with 3 different codes for all invalid fields', (done) => {
            request(app)
                .post('/api/comment')
                .send({ jobID: 'test', message: '', author: '' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                    expect(res.body[0].code).to.equal(4);
                    expect(res.body[1].code).to.equal(5);
                    expect(res.body[2].code).to.equal(6);
                })
                .end(done);
        });
    });
});