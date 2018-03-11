import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');

describe('job list', () => {
  let page: AppPage;

  function restoreJobData() {
    db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
      db.conn.query(`CREATE TABLE job (
                  id INT NOT NULL AUTO_INCREMENT,
                  organization VARCHAR(45) NOT NULL,
                  title VARCHAR(100) NOT NULL,
                  location VARCHAR(45),
                  description VARCHAR(2000),
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

  it('should display all the jobs in the job list', () => {
    browser.get('/');
    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.count()).toEqual(4);
    expect(jobOrgs.count()).toEqual(4);
    expect(jobLocs.count()).toEqual(4);

    expect(jobTitles.get(0).getText()).toEqual("Software Engineer");
    expect(jobTitles.get(1).getText()).toEqual("Software Developer");
    expect(jobTitles.get(2).getText()).toEqual("Junior Dev");
    expect(jobTitles.get(3).getText()).toEqual("Soft Dev");
  });

  it('should add a job', () => {
    browser.get('/addjob');

    element(by.id('organization')).sendKeys("My Test Organization");
    element(by.id('title')).sendKeys("My Test Title");
    element(by.id('location')).sendKeys("My Test Location");
    element(by.id('description')).sendKeys("My Test Description");

    element(by.buttonText('Submit')).click();

    expect(element(by.css('.alert-success')).isDisplayed()).toBe(true);

    browser.get('/');

    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.get(4).getText()).toEqual("My Test Title");
    expect(jobOrgs.get(4).getText()).toEqual("My Test Organization");
    expect(jobLocs.get(4).getText()).toEqual("My Test Location");
  });
});
