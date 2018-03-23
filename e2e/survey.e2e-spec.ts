import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('survey', () => {
    let page: AppPage;

    function restoreSurveyData(done) {
        fs.readFile('test/survey.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
              done();
            });
        });
    };

    beforeAll((done) => {
        restoreSurveyData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreSurveyData(done);
    });

    it('should navigate to and show the survey', () => {
        browser.get('/');

        element(by.linkText('Survey')).click();

        let questions = element.all(by.css(".question"));

        expect(questions.get(0).getText()).toEqual("1. Is this a test?");
        expect(questions.get(1).getText()).toEqual("2. ?");

        let responses = element.all(by.css(".responseText"));

        expect(responses.get(0).getText()).toEqual("True");
        expect(responses.get(1).getText()).toEqual("False");

        expect(responses.get(2).getText()).toEqual("Disagree");
        expect(responses.get(3).getText()).toEqual("No Opinion");
        expect(responses.get(4).getText()).toEqual("Agree");
    });

    it('should be able to select survey responses and submit them', () => {
        browser.get('/');

        element(by.linkText('Survey')).click();

        let responses = element.all(by.css(".responseText"));

        responses.get(1).all(by.css("input[type='radio']")).click();
        responses.get(3).all(by.css("input[type='radio']")).click();

        element(by.buttonText('Submit')).click();

        expect(element(by.css('.text-success')).isDisplayed()).toBeTruthy();
    });
});
