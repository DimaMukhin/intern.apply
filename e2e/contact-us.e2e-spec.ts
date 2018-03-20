import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('contact-us', () => {
    let page: AppPage;

    function restoreContactUsData(done) {
        fs.readFile('test/contactMessage.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
              done();
            });
        });
    }

    beforeAll((done) => {
        restoreContactUsData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreContactUsData(done);
    });

    it('should successfully send a contact-us message to the developers', () => {
        browser.get('/');

        element(by.linkText('Contact')).click();

        element(by.id('emailInput')).sendKeys('dima@gmail.com');
        element(by.id('subjectInput')).sendKeys('test title');
        element(by.id('messageBody')).sendKeys('hello world! valid message');

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.text-success')).isDisplayed()).toBe(true);
    });

    it('should show invalid email message when sending a message with invalid email', () => {
        browser.get('/');

        element(by.linkText('Contact')).click();

        element(by.id('emailInput')).sendKeys('dima@gmail.');
        element(by.id('subjectInput')).sendKeys('test title');
        element(by.id('messageBody')).sendKeys('hello world! valid message');

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.email-danger')).isDisplayed()).toBe(true);
    });

    it('should show invalid title message when sending a message with invalid title', () => {
        browser.get('/');

        element(by.linkText('Contact')).click();

        element(by.id('emailInput')).sendKeys('dima@gmail.com');
        element(by.id('subjectInput')).sendKeys('test title long test title long test title long test title long test title long test title long');
        element(by.id('messageBody')).sendKeys('hello world! valid message');

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.title-danger')).isDisplayed()).toBe(true);
    });

    it('should show invalid body message when sending a message with invalid body', () => {
        browser.get('/');

        element(by.linkText('Contact')).click();

        element(by.id('emailInput')).sendKeys('dima@gmail.com');
        element(by.id('subjectInput')).sendKeys('test title');
        element(by.id('messageBody')).sendKeys('');

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.message-danger')).isDisplayed()).toBe(true);
    });

    it('should render all invalid fields messages when sending a complete invalid message', () => {
        browser.get('/');

        element(by.linkText('Contact')).click();

        element(by.id('emailInput')).sendKeys('');
        element(by.id('subjectInput')).sendKeys('');
        element(by.id('messageBody')).sendKeys('');

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.email-danger')).isDisplayed()).toBe(true);
        expect(element(by.css('.title-danger')).isDisplayed()).toBe(true);
        expect(element(by.css('.message-danger')).isDisplayed()).toBe(true);
    });
});