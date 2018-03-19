import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('add-job', () => {
    let page: AppPage;

    function restoreJobData(done) {
        fs.readFile('test/job2.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
              done();
            });
        });
    };

    beforeAll((done) => {
        restoreJobData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreJobData(done);
    });

    it('should add a new job', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization e2e');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('https://www.validurl.com');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        expect(page.getSuccessAlertElement().isDisplayed()).toBeTruthy();
    });

    it('should display invalid job organization error message', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('https://www.validurl.com');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job organization (max 45 characters allowed)');
    });

    it('should display invalid job title error message', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization');
        page.getJobTitleInputElement().sendKeys('');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('https://www.validurl.com');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job title (max 100 characters allowed)');
    });

    it('should display invalid job location error message', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('');
        page.getJobUrlInputElement().sendKeys('https://www.validurl.com');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job location (max 45 characters allowed)');
    });

    it('should display invalid job URL error message', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job URL (max 1000 characters allowed)');
    });

    it('should display invalid job URL error message when URL does not contain http or https', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('www.invalidurl.com');
        page.getJobDescInputElement().sendKeys('Job Description e2e');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job URL (max 1000 characters allowed)');
    });

    it('should display invalid job description error message', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('Job Organization');
        page.getJobTitleInputElement().sendKeys('Job Title e2e');
        page.getJobLocInputElement().sendKeys('Job Location e2e');
        page.getJobUrlInputElement().sendKeys('https://www.validurl.com');
        page.getJobDescInputElement().sendKeys('');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(1);
        expect(errors.get(0).getText()).toBe('Please enter a valid job description (max 2000 characters allowed)');
    });

    it('should display all job form error messages', () => {
        page.navigateTo();
        page.getAddJobButton().click();

        page.getJobOrgInputElement().sendKeys('');
        page.getJobTitleInputElement().sendKeys('');
        page.getJobLocInputElement().sendKeys('');
        page.getJobUrlInputElement().sendKeys('');
        page.getJobDescInputElement().sendKeys('');
        page.getSubmitButton().click();

        let errors = page.getJobErrorMessages();

        expect(errors.count()).toBe(5);
        expect(errors.get(0).getText()).toBe('Please enter a valid job organization (max 45 characters allowed)');
        expect(errors.get(1).getText()).toBe('Please enter a valid job title (max 100 characters allowed)');
        expect(errors.get(2).getText()).toBe('Please enter a valid job location (max 45 characters allowed)');
        expect(errors.get(3).getText()).toBe('Please enter a valid job URL (max 1000 characters allowed)');
        expect(errors.get(4).getText()).toBe('Please enter a valid job description (max 2000 characters allowed)');
    });
});
