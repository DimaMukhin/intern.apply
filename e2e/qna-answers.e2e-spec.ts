import {browser, element, by} from 'protractor';
import {AppPage} from './app.po';

const db = require('../server/e2e/db.service');

describe('Q&A Answers', () => {
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

    it('should display all existing answers to a question', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        browser.waitForAngular();

        element(by.cssContainingText('.question-title', 'how much time to find a job?')).click();
        browser.waitForAngular();

        const answerAuthors = element.all(by.css('.answer-author-name'));
        const answerBodies = element.all(by.css('.answer-body'));
        const answerTimeStamps = element.all(by.css('.answer-timestamp'));

        expect(answerAuthors.count()).toEqual(2);
        expect(answerBodies.count()).toEqual(2);
        expect(answerTimeStamps.count()).toEqual(2);

        expect(answerAuthors.get(0).getText()).toEqual('Ben');
        expect(answerAuthors.get(1).getText()).toEqual('Ben');
        expect(answerBodies.get(0).getText()).toEqual('body of answer 1');
        expect(answerBodies.get(1).getText()).toEqual('body of answer 2');
        expect(answerTimeStamps.get(0).isDisplayed()).toBe(true);
        expect(answerTimeStamps.get(1).isDisplayed()).toBe(true);
    });

    it('should add a valid answer and display it', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        browser.waitForAngular();

        element(by.cssContainingText('.question-title', 'how much time to find a job?')).click();
        browser.waitForAngular();

        element(by.id('authorInput')).sendKeys('Shai');
        element(by.id('answerBody')).sendKeys('test answer');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.text-success')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        const newAnswer = element(by.cssContainingText('.answer-author-name', 'Shai'));

        expect(newAnswer.isDisplayed()).toBe(true);
    });

    it('should not add a new answer with an invalid answer author', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        browser.waitForAngular();

        element(by.cssContainingText('.question-title', 'how much time to find a job?')).click();
        browser.waitForAngular();

        element(by.id('authorInput')).sendKeys('ShaiShaiShaiShaiShaiShaiShaiShaiShaiShai');
        element(by.id('answerBody')).sendKeys('test answer');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.author-danger')).isDisplayed()).toBe(true);
    });

    it('should not add a new answer with an invalid answer body', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        browser.waitForAngular();

        element(by.cssContainingText('.question-title', 'how much time to find a job?')).click();
        browser.waitForAngular();

        element(by.id('authorInput')).sendKeys('Shai');
        element(by.id('answerBody')).sendKeys('');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.body-danger')).isDisplayed()).toBe(true);
    });
});
