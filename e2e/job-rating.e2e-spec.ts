import {browser, element, by} from 'protractor';
import {AppPage} from './app.po';

const db = require('../server/e2e/db.service');

describe('job rating', () => {
    let page: AppPage;

    function restoreJobData(done) {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
            db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    salary DECIMAL(4,1),
                    numSalaries INT(10),
                    PRIMARY KEY (id))`
                , (err, res) => {
                    db.conn.query(`INSERT INTO job (id, organization, title, location, salary, numSalaries) VALUES
                    (1, 'Facebook', 'test title', 'winnipeg', 4, 1),
                    (2, 'google', 'second title', 'vancouver', 3, 2),
                    (3, 'CityOFWinnipeg', 'third title', 'location', 0, 0)`
                        , (err, res) => {
                            db.conn.query('DROP TABLE IF EXISTS jobRating', (err, res) => {
                                db.conn.query(`CREATE TABLE jobRating (
                              jobId INT(11) NOT NULL,
                              score DECIMAL(3,2) DEFAULT '0.00' NOT NULL,
                              votes INT(11) DEFAULT '0' NOT NULL,
                              PRIMARY KEY(jobId),
                              CONSTRAINT jobId___fk FOREIGN KEY (jobId) REFERENCES job (id) ON DELETE CASCADE )`,
                                    (err, res) => {
                                        db.conn.query(`INSERT INTO jobRating(jobId, score, votes) VALUES
                                                       (1, 1.0, 1),
                                                       (2, 2.0, 2)`, (err, res) => {
                                            done();
                                        });
                                    });
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

        browser.waitForAngular();

        element(by.css('.job-rating')).click();
        const jobVotes = element(by.css('.votes'));

        expect(jobVotes.getText()).toEqual('(1 votes)');
    });


});
