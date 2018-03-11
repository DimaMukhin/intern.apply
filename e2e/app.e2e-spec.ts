import { browser } from 'protractor';
import { AppPage } from './app.po';
const db = require('../server/e2e-tests/db.service');

describe('intern.apply App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    db.printSomething();
    db.addJob({
      organization: "e2e org",
      title: "e2e title",
      location: "e2e location"
    });
    
    browser.pause();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
