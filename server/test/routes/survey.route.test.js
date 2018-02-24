const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('survey.route.js', () => {

    beforeEach((done) => {
        db.conn.query('DROP TABLE surveyQuestion', (err, res) => {
            db.conn.query(`CREATE TABLE surveyQuestion (
                id INT NOT NULL AUTO_INCREMENT,
                question VARCHAR(300) NOT NULL,
                questionType VARCHAR(300) NOT NULL,
                questionIndex INT NOT NULL,
                PRIMARY KEY (id))`
            , (err, res) => {
                db.conn.query(`INSERT INTO surveyQuestion (id, question, questionType, questionIndex) VALUES 
                    (1, 'Is this a test?', 'boolean', 1),
                    (2, '?', 'scale', 2)`
                , (err, res) => { });
            });
        });

        db.conn.query('DROP TABLE surveyResponse', (err, res) => {
            db.conn.query(`CREATE TABLE surveyResponse (
                id INT NOT NULL AUTO_INCREMENT,
                response VARCHAR(300) NOT NULL,
                questionType VARCHAR(300) NOT NULL,
                PRIMARY KEY (id))`
            , (err, res) => {
                db.conn.query(`INSERT INTO surveyResponse (id, response, questionType) VALUES 
                    (1, 'True', 'boolean'),
                    (2, 'False', 'boolean'),

                    (3, 'Disagree', 'scale'),
                    (4, 'No Opinion', 'scale'),
                    (5, 'Agree', 'scale')`
                , (err, res) => { });
            });
        });

        db.conn.query('SET FOREIGN_KEY_CHECKS = 0', (err, res) => {
            db.conn.query('DROP TABLE completedSurvey', (err, res) => {
                db.conn.query(`CREATE TABLE completedSurvey (
                    id INT NOT NULL AUTO_INCREMENT,
                    completionTime date NOT NULL,
                    PRIMARY KEY (id))`
                , (err, res) => {
                    db.conn.query(`INSERT INTO completedSurvey (id, completionTime) VALUES 
                        (1, '2018-02-24'),
                        (2, '1100-01-01')`
                    , (err, res) => {
                        db.conn.query('DROP TABLE completedSurveyRes', (err, res) => {
                            db.conn.query(`CREATE TABLE completedSurveyRes (
                                id INT NOT NULL AUTO_INCREMENT,
                                surveyID INT NOT NULL,
                                response VARCHAR(300) NOT NULL,
                                questionIndex INT NOT NULL,
                                PRIMARY KEY (id),
                                INDEX (surveyID),
                                FOREIGN KEY (surveyID) REFERENCES completedSurvey(id) ON DELETE CASCADE)`
                            , (err, res) => {
                                db.conn.query(`INSERT INTO completedSurveyRes (id, surveyID, response, questionIndex) VALUES 
                                    (1, 1, 'True', 1),
                                    (2, 1, 'No Opinion', 2)`
                                , (err, res) => {
                                    db.conn.query('SET FOREIGN_KEY_CHECKS = 1', (err, res) => {
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
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
                .send( {answers: ['False', 'Agree']} )
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
                .send( {answers: []} )
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
                .send( {answers: ['True', -1]} )
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(51);
                })
                .end(done);
        });
    });
});