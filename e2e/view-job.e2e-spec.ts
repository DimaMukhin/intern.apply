import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');

describe('job details', () => {
    let page: AppPage;

    function restoreJobData(done) {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
            db.conn.query(`CREATE TABLE job (
                  id INT NOT NULL AUTO_INCREMENT,
                  organization VARCHAR(45) NOT NULL,
                  title VARCHAR(100) NOT NULL,
                  location VARCHAR(45),
                  description VARCHAR(2000),
                  PRIMARY KEY (id))`,
                (err, res) => {
                    db.conn.query(`INSERT INTO job (id, organization, title, location, description) VALUES
                      (1, 'Facebook', 'Software Engineer', 'winnipeg', 'Please come work for FB'),
                      (2, 'google', 'Software Developer', 'vancouver', 'cyka'),
                      (3, 'CityOFWinnipeg', 'Junior Dev', 'location', 'blat'),
                      (4, 'CityOFWinnipeg', 'Soft Dev', 'location', 'damn')`,
                        (err, res) => {
                            done();
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
