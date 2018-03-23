import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('add job salary', () => {
    let page: AppPage;

    function restoreJobData(done) {
        fs.readFile('test/job.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
                done();
            });
        });
    }

    beforeAll((done) => {
        restoreJobData(done);
    });

    beforeEach((done) => {
        page = new AppPage();
        restoreJobData(done);
    });

    afterEach((done) => {
        restoreJobData(done);
    });

    it('should display the salary of a job', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'google')).click();

        browser.waitForAngular();
        const jobSalary = element(by.css('.view-avgSalary'));

        expect(jobSalary.getText()).toEqual('Average Salary: 3.0k per year (2 submits)');
    });

    it('should not show salary when there are salary submits', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'CityOFWinnipeg')).click();

        browser.waitForAngular();
        const jobSalary = element(by.css('.view-avgSalary'));

        expect(jobSalary == null);
    });
});
