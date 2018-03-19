import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e/db.service');
const fs = require('fs');

describe('job list', () => {
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
});
