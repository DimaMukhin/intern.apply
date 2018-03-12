import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');

describe('add-job', () => {
    let page: AppPage;

    function restoreJobData() {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
            db.conn.query(`CREATE TABLE job (
                  id INT NOT NULL AUTO_INCREMENT,
                  organization VARCHAR(45) NOT NULL,
                  title VARCHAR(100) NOT NULL,
                  location VARCHAR(45),
                  description VARCHAR(2000),
                  url VARCHAR(1000),
                  PRIMARY KEY (id))`,
                (err, res) => {
                    db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
                      (1, 'Facebook', 'Software Engineer', 'winnipeg'),
                      (2, 'google', 'Software Developer', 'vancouver'),
                      (3, 'CityOFWinnipeg', 'Junior Dev', 'location'),
                      (4, 'CityOFWinnipeg', 'Soft Dev', 'location')`,
                        (err, res) => {
                        });
                });
        });
    };

    beforeAll(() => {
        restoreJobData();
    });

    beforeEach(() => {
        page = new AppPage();
        restoreJobData();
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
