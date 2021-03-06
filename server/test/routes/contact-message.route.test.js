const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');
const fs = require('fs');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('contact-message.route.js', () => {

    beforeEach((done) => {
        fs.readFile('test/contactMessage.sql', "utf8", function (err, comData) {
            db.conn.query(comData, (err, res) => {
                done();
            });
        });
    });

    describe('GET /contactMessage', () => {
        it('should return all the contact messages', (done) => {
            request(app)
                .get('/api/contactMessage')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                })
                .end(done);
        });
    });

    describe('POST /contactMessage', () => {

        it('should create a new contact message', (done) => {
            request(app)
                .post('/api/contactMessage')
                .send({ email: 'test@gg.com', title: 'testtitle', message: 'test message' })
                .expect(200)
                .expect(res => {
                    expect(res.body.email).to.equal('test@gg.com');
                    expect(res.body.title).to.equal('testtitle');
                    expect(res.body.message).to.equal('test message');
                })
                .end(done);
        });

        it('should return an error message with code 1 for invalid email address', (done) => {
            request(app)
                .post('/api/contactMessage')
                .send({ email: 'test', title: 'testtitle', message: 'test message' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(1);
                })
                .end(done);
        });

        it('should return an error message with code 2 for invalid title', (done) => {
            request(app)
                .post('/api/contactMessage')
                .send({ email: 'test@gmail.com', title: '', message: 'test message' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(2);
                })
                .end(done);
        });

        it('should return an error message with code 3 for invalid contact us message', (done) => {
            request(app)
                .post('/api/contactMessage')
                .send({ email: 'test@gmail.com', title: 'testtitle', message: '' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(3);
                })
                .end(done);
        });

        it('should return 3 error messages with 3 different codes for 3 different invalid fields', (done) => {
            request(app)
                .post('/api/contactMessage')
                .send({ email: 'test', title: '', message: '' })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                    expect(res.body[0].code).to.equal(1);
                    expect(res.body[1].code).to.equal(2);
                    expect(res.body[2].code).to.equal(3);
                })
                .end(done);
        });
    });
});