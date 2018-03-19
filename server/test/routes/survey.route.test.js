const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');
const fs = require('fs');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('survey.route.js', () => {

    beforeEach((done) => {
        fs.readFile('test/survey.sql', "utf8", function (err, comData) {
            db.conn.query(comData, (err, res) => {
              done();
            });
        });
    });

    afterEach((done) => {
        db.conn.query('DROP TABLE IF EXISTS completedSurveyRes', (err, res) => {
            db.conn.query('DROP TABLE IF EXISTS completedSurvey', (err, res) => {
                done();
            });
        });
    });

    describe('GET /survey', () => {
        it('should return all the survey questions with their responses', (done) => {
            request(app)
                .get('/api/survey')
                .expect(200)
                .expect(res => {
                    let questions = res.body;
                    expect(questions).to.have.lengthOf(2);

                    expect(questions[0].question).to.equal('Is this a test?');
                    expect(questions[0].questionType).to.equal('boolean');
                    expect(questions[0].questionIndex).to.equal(1);
                    expect(questions[0].responses[0]).to.equal('True');
                    expect(questions[0].responses[1]).to.equal('False');

                    expect(questions[1].question).to.equal('?');
                    expect(questions[1].questionType).to.equal('scale');
                    expect(questions[1].questionIndex).to.equal(2);
                    expect(questions[1].responses[0]).to.equal('Disagree');
                    expect(questions[1].responses[1]).to.equal('No Opinion');
                    expect(questions[1].responses[2]).to.equal('Agree');
                })
                .end(done);
        });
    });

    describe('POST /survey', () => {
        it('should save the survey responses as a completed survey', (done) => {
            request(app)
                .post('/api/survey')
                .send({ answers: ['False', 'Agree'] })
                .expect(200)
                .expect(res => {
                    let responses = res.body;
                    expect(responses.answers).to.have.lengthOf(2);

                    expect(responses.answers[0]).to.equal('False');
                    expect(responses.answers[1]).to.equal('Agree');
                })
                .end(done);
        });

        it('should return an error message with code 51 for empty survey', (done) => {
            request(app)
                .post('/api/survey')
                .send({ answers: [] })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(51);
                })
                .end(done);
        });

        it('should return an error message with code 51 for survey with a non selection', (done) => {
            request(app)
                .post('/api/survey')
                .send({ answers: ['True', null] })
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(51);
                })
                .end(done);
        });
    });
});