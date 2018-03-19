import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('job-comment', () => {
    let page: AppPage;

    function restoreCommentData(done) {
        fs.readFile('test/job.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
                fs.readFile('test/comment.sql', "utf8", function (err, comData) {
                    db.conn.query(comData, (err, res) => {
                        done();
                    });
                });
            });
        });
    }

    beforeAll((done) => {
        restoreCommentData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreCommentData(done);
    });

    afterEach((done) => {
        db.conn.query('DROP TABLE IF EXISTS comment', (err, res) => {
            db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
                done();
            });
        });
    });

    it('should display all the existing comments for the Facebook job', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'Facebook')).click();
        
        browser.waitForAngular();
        let commentAuthors = element.all(by.css('.cm-author'));
        let commentBodys = element.all(by.css('.cm-message'));

        expect(commentAuthors.count()).toEqual(2);
        expect(commentBodys.count()).toEqual(2);

        expect(commentAuthors.get(0).getText()).toEqual('dima');
        expect(commentAuthors.get(1).getText()).toEqual('ben');
        expect(commentBodys.get(0).getText()).toEqual('this is a nice comment body');
        expect(commentBodys.get(1).getText()).toEqual('another comment for the same job');
    });

    it('should display no comments for the City OF Winnipeg job', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'CityOFWinnipeg')).click();
        
        browser.waitForAngular();
        let commentAuthors = element.all(by.css('.cm-author'));
        let commentBodys = element.all(by.css('.cm-message'));

        expect(commentAuthors.count()).toEqual(0);
        expect(commentBodys.count()).toEqual(0);
    });

    it('should successfully add a new comment to the google job', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'google')).click();
        element(by.id('nameInput')).sendKeys('Big Smoke');
        element(by.id('messageBody')).sendKeys('All you had to do was to follow the goddamn train');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.text-success')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        let commentAuthors = element.all(by.css('.cm-author'));
        let commentBodys = element.all(by.css('.cm-message'));

        expect(commentAuthors.count()).toEqual(2);
        expect(commentBodys.count()).toEqual(2);
        expect(commentAuthors.get(0).getText()).toEqual('rick');
        expect(commentAuthors.get(1).getText()).toEqual('Big Smoke');
        expect(commentBodys.get(0).getText()).toEqual('this last comment is for job 2');
        expect(commentBodys.get(1).getText()).toEqual('All you had to do was to follow the goddamn train');
    });

    it('should not add a new comment to the google job with an invalid author name', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'google')).click();
        element(by.id('nameInput')).sendKeys('Too long Too long Too long Too long Too long Too long Too long');
        element(by.id('messageBody')).sendKeys('All you had to do was to follow the goddamn train');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.name-danger')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        let commentAuthors = element.all(by.css('.cm-author'));
        let commentBodys = element.all(by.css('.cm-message'));

        expect(commentAuthors.count()).toEqual(1);
        expect(commentBodys.count()).toEqual(1);
        expect(commentAuthors.get(0).getText()).toEqual('rick');
        expect(commentBodys.get(0).getText()).toEqual('this last comment is for job 2');
    });

    it('should not add a new comment to the google job with an invalid comment body', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'google')).click();
        element(by.id('nameInput')).sendKeys('yes');
        element(by.id('messageBody')).sendKeys('');
        element(by.buttonText('Submit')).click();

        expect(element(by.css('.message-danger')).isDisplayed()).toBe(true);

        browser.refresh();
        browser.waitForAngular();
        let commentAuthors = element.all(by.css('.cm-author'));
        let commentBodys = element.all(by.css('.cm-message'));

        expect(commentAuthors.count()).toEqual(1);
        expect(commentBodys.count()).toEqual(1);
        expect(commentAuthors.get(0).getText()).toEqual('rick');
        expect(commentBodys.get(0).getText()).toEqual('this last comment is for job 2');
    });
});