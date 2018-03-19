const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');
const fs = require('fs');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('salary.route.js', () => {

    beforeEach((done) => {
        fs.readFile('test/job.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
                done();
            });
        });
    });

    describe('POST /salary', () => {
        it('should add year salary properly to the average', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: 6000, salaryType: 0 })
                .expect(200)
                .expect(res => {
                    let job = res.body;
                    expect(job.salary).to.equal('5.0');
                    expect(job.salaryType).to.equal(2);
                })
                .end(done);
        })

        it('should add monthly salary properly to the average', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: 500, salaryType: 1 })
                .expect(200)
                .expect(res => {
                    let job = res.body;
                    expect(job.salary).to.equal('5.0');
                    expect(job.salaryType).to.equal(2);
                })
                .end(done);
        })

        it('should add biweekly salary properly to the average', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: 250, salaryType: 2 })
                .expect(200)
                .expect(res => {
                    let job = res.body;
                    expect(job.salary).to.equal('5.0');
                    expect(job.salaryType).to.equal(2);
                })
                .end(done);
        })

        it('should add hourly salary properly to the average', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 3, salary: 25, salaryType: 3 })
                .expect(200)
                .expect(res => {
                    let job = res.body;
                    expect(job.salary).to.equal('55.2');
                    expect(job.salaryType).to.equal(1);
                })
                .end(done);
        })

        it('should return an error message for invalid salary', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: -5, salaryType: 0 })
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(1);
                    expect(err.body[0].code).to.equal(41);
                })
                .end(done);
        })

        it('should return an error message for invalid salaryType', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: 5, salaryType: 4 })
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(1);
                    expect(err.body[0].code).to.equal(42);
                })
                .end(done);
        })

        it('should return an error message for invalid salary and salaryType', (done) => {
            request(app)
                .post('/api/salary')
                .send({ jobID: 1, salary: 0, salaryType: -1 })
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(2);
                    expect(err.body[0].code).to.equal(41);
                    expect(err.body[1].code).to.equal(42);
                })
                .end(done);
        })

    });
});