import {browser, element, by} from 'protractor';
import {AppPage} from './app.po';

const db = require('../server/e2e/db.service');

describe('Q&A-answers', () => {
    let page: AppPage;

    function restoreQuestionData(done) {
        db.conn.query(`DROP TABLE IF EXISTS question`, (err, res) => {
            db.conn.query(`CREATE TABLE question (
                    id INT NOT NULL AUTO_INCREMENT,
                    title VARCHAR(45) NOT NULL,
                    body VARCHAR(1000) NOT NULL,
                    author VARCHAR(45) NOT NULL,
                    creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id))`,
                (err, res) => {
                    db.conn.query(`INSERT INTO question (id, title, author, body) VALUES
                            (1, 'first test title', 'Dima', 'this is the body'),
                            (2, 'how much time to find a job?', 'Ben', 'I dont want to wait'),
                            (3, 'what are you looking at?', 'dima', 'this is just a question')`,
                        (err, res) => {
                            db.conn.query(`DROP TABLE IF EXISTS answers`, (err, res) => {
                                db.conn.query(`CREATE TABLE answers (
                                        questionId INT(11) NOT NULL,
                                        body VARCHAR(1000) NOT NULL,
                                        author VARCHAR(45) NOT NULL,
                                        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                        FOREIGN KEY (questionId) REFERENCES question (id) ON DELETE CASCADE)`,
                                    (err, res) => {
                                        db.conn.query(`INSERT INTO answers (questionId, body, author) VALUES
                                                (1, 'body of answer 1', 'Dima'),
                                                (1, 'body of answer 2', 'Dima'),
                                                (2, 'body of answer 1', 'Ben'),
                                                (2, 'body of answer 2', 'Ben')`,
                                            (err, res) => {
                                                done();
                                            });
                                    });
                            });
                        });
                });
        });
    }

    beforeAll((done) => {
        restoreQuestionData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreQuestionData(done);
    });

    afterEach((done) => {
        db.conn.query('DROP TABLE IF EXISTS answers', (err, res) => {
            db.conn.query('DROP TABLE IF EXISTS question', (err, res) => {
                done();
            });
        });
    });
});
