import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('job rating', () => {
    let page: AppPage;

    function restoreJobData(done) {
        fs.readFile('test/job.sql', "utf8", function (err, data) {
            db.conn.query(data, (err, res) => {
                fs.readFile('test/jobRating2.sql', "utf8", function (err, ratData) {
                    db.conn.query(ratData, (err, res) => {
                        done();
                    });
                });
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
        db.conn.query('DROP TABLE IF EXISTS jobRating', (err, res) => {
            db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
                done();
            });
        });
    });

    it('should display the rating of a job', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'Facebook')).click();

        browser.waitForAngular();
        const jobVotes = element(by.css('.votes'));

        expect(jobVotes.getText()).toEqual('(1 votes)');
    });

    it('should show rating of 0 when a job wasnt rated', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'CityOFWinnipeg')).click();

        browser.waitForAngular();
        const jobVotes = element(by.css('.votes'));

        expect(jobVotes.getText()).toEqual('(0 votes)');
    });

    it('should increase the number of votes when a job was rated', () => {
        browser.get('/');

        element(by.cssContainingText('.job-org', 'CityOFWinnipeg')).click();

        element(by.css('.job-rating')).click();

        browser.waitForAngular();
        const jobVotes = element(by.css('.votes'));

        expect(jobVotes.getText()).toEqual('(1 votes)');
    });


});
