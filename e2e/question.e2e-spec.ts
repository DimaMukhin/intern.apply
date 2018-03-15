import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');

describe('Q&A Question', () => {
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
                    done();
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

    it('should display all existing questions', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();

        let questionAuthors = element.all(by.css('.question-author'));
        let questionTitles = element.all(by.css('.question-title'));
        let questionTimeStamps = element.all(by.css('.question-time'));

        expect(questionAuthors.count()).toEqual(3);
        expect(questionTitles.count()).toEqual(3);
        expect(questionTimeStamps.count()).toEqual(3);

        expect(questionAuthors.get(0).getText()).toEqual('Dima');
        expect(questionAuthors.get(1).getText()).toEqual('Ben');
        expect(questionTitles.get(0).getText()).toEqual('first test title');
        expect(questionTitles.get(1).getText()).toEqual('how much time to find a job?');
        expect(questionTimeStamps.get(0).isDisplayed()).toBe(true);
        expect(questionTimeStamps.get(1).isDisplayed()).toBe(true);
    });

    it('should navigate to the correct question and display correct information', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        element(by.cssContainingText('.question-title', 'how much time to find a job?')).click();

        expect(element(by.css('.question-title')).getText()).toEqual('how much time to find a job?');
        expect(element(by.css('.question-author')).getText()).toEqual('Asked by: Ben');
        expect(element(by.css('.question-body')).getText()).toEqual('I dont want to wait');
    });

    it('should successfully add a new valid question and display it', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        element(by.buttonText('Ask')).click();

        element(by.id('nameInput')).sendKeys('manny calavera');
        element(by.id('titleInput')).sendKeys('how can I get on the number 9?');
        element(by.id('questionBody')).sendKeys('I was not good but I have to get a ticket, plz help');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.text-success')).isDisplayed()).toBe(true);

        element(by.buttonText('Close')).click();
        
        expect(element(by.css('.question-ask-form')).isPresent()).toBe(false);

        browser.refresh();
        browser.waitForAngular();
        let newQuestion = element(by.cssContainingText('.question-title', 'how can I get on the number 9?'));
        
        expect(newQuestion.isDisplayed()).toBe(true);

        newQuestion.click();

        expect(element(by.css('.question-title')).getText()).toEqual('how can I get on the number 9?');
        expect(element(by.css('.question-author')).getText()).toEqual('Asked by: manny calavera');
        expect(element(by.css('.question-body')).getText()).toEqual('I was not good but I have to get a ticket, plz help');
    });

    it('should not add a new question with an invalid question author name', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        element(by.buttonText('Ask')).click();

        element(by.id('nameInput')).sendKeys('long long long long long long long long long long long long');
        element(by.id('titleInput')).sendKeys('how can I get on the number 9?');
        element(by.id('questionBody')).sendKeys('I was not good but I have to get a ticket, plz help');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.name-danger')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        expect(element(by.cssContainingText('.question-title', 'how can I get on the number 9?')).isPresent()).toBe(false);
    });

    it('should not add a new question with an invalid question title', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        element(by.buttonText('Ask')).click();

        element(by.id('nameInput')).sendKeys('dimba');
        element(by.id('titleInput')).sendKeys('how can I get on the number 9? how can I get on the number 9? how can I get on the number 9?');
        element(by.id('questionBody')).sendKeys('I was not good but I have to get a ticket, plz help');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.title-danger')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        expect(element(by.cssContainingText('.question.author', 'dimba')).isPresent()).toBe(false);
    });

    it('should not add a new question with an invalid question body', () => {
        browser.get('/');
        element(by.linkText('Q&A')).click();
        element(by.buttonText('Ask')).click();

        element(by.id('nameInput')).sendKeys('dimba');
        element(by.id('titleInput')).sendKeys('how can I get on the number 9?');
        element(by.id('questionBody')).sendKeys('');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.question-danger')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        expect(element(by.cssContainingText('.question.author', 'dimba')).isPresent()).toBe(false);
    });
});