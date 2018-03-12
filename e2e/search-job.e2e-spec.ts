import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');

describe('search jobs', () => {
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
                      (3, 'CityOFWinnipeg', 'Junior Dev', 'alberta'),
                      (4, 'CityOFWinnipeg', 'Soft Dev', 'toronto')`,
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

  it('should return jobs upon search by organization', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("google");

    element(by.buttonText('Search')).click();

    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.count()).toEqual(1);
    expect(jobOrgs.count()).toEqual(1);
    expect(jobLocs.count()).toEqual(1);
    
    expect(jobTitles.get(0).getText()).toEqual("Software Developer");
    expect(jobOrgs.get(0).getText()).toEqual("google");
    expect(jobLocs.get(0).getText()).toEqual("vancouver");
  });

  it('should return jobs upon search by location', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("toronto");

    element(by.buttonText('Search')).click();

    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.count()).toEqual(1);
    expect(jobOrgs.count()).toEqual(1);
    expect(jobLocs.count()).toEqual(1);

    expect(jobTitles.get(0).getText()).toEqual("Soft Dev");
    expect(jobOrgs.get(0).getText()).toEqual("CityOFWinnipeg");
    expect(jobLocs.get(0).getText()).toEqual("toronto");

  });

  it('should return job upon search by title', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("Junior Dev");

    element(by.buttonText('Search')).click();

    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.count()).toEqual(1);
    expect(jobOrgs.count()).toEqual(1);
    expect(jobLocs.count()).toEqual(1);

    expect(jobTitles.get(0).getText()).toEqual("Junior Dev");
    expect(jobOrgs.get(0).getText()).toEqual("CityOFWinnipeg");
    expect(jobLocs.get(0).getText()).toEqual("alberta");

  });

  it('should show no jobs found', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("Master");

    element(by.buttonText('Search')).click();

    let no_job = element.all(by.css('.no-job'));

    expect(no_job.get(0).getText()).toEqual("No Jobs Found!");
  });

  it('should indicate search text too long', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry");

    element(by.buttonText('Search')).click();

    let long_query = element.all(by.css('.long-query'));

    expect(long_query.get(0).getText()).toEqual("Search query too long! (Max characters allowed 100)");
    
  });

  it('should return all jobs on empty search query', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("");

    element(by.buttonText('Search')).click();

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

  it('should return multiple jobs upon search', () => {
    
    browser.get('/');

    element(by.id('search')).sendKeys("Software");

    element(by.buttonText('Search')).click();

    let jobTitles = element.all(by.css('.job-title'));
    let jobOrgs = element.all(by.css('.job-org'));
    let jobLocs = element.all(by.css('.job-loc'));

    expect(jobTitles.count()).toEqual(2);
    expect(jobOrgs.count()).toEqual(2);
    expect(jobLocs.count()).toEqual(2);

    expect(jobTitles.get(0).getText()).toEqual("Software Engineer");
    expect(jobTitles.get(1).getText()).toEqual("Software Developer");

  });
});
