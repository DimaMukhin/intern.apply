import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('job details', () => {
    let page: AppPage;

    function restoreJobData(done) {
        fs.readFile('test/job2.sql', "utf8", function (err, data) {
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

    it('should display the details of a job', () => {
        browser.get('/');
        element(by.cssContainingText('.job-org', 'Facebook')).click();

        browser.waitForAngular();
        const jobTitle = element(by.css('.view-title'));
        const jobOrg = element(by.css('.view-organization'));
        const jobLoc = element(by.css('.view-location'));
        const jobDesc = element(by.css('.view-description'));

        expect(jobTitle.getText()).toEqual('Software Engineer');
        expect(jobOrg.getText()).toEqual('Facebook');
        expect(jobLoc.getText()).toEqual('winnipeg');
        expect(jobDesc.getText()).toEqual('Please come work for FB');
    });
});
