import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAddJobButton() {
    return element(by.linkText('Add Job'));
  }

  getJobOrgInputElement() {
    return element(by.id('organization'));
  }

  getJobTitleInputElement() {
    return element(by.id('title'));
  }

  getJobLocInputElement() {
    return element(by.id('location'));
  }

  getJobUrlInputElement() {
    return element(by.id('url'));
  }

  getJobDescInputElement() {
    return element(by.id('description'));
  }

  getSubmitButton() {
    return element(by.buttonText('Submit'));
  }

  getJobErrorMessages() {
    return element.all(by.css('.text-danger'));
  }

  getSuccessAlertElement() {
    return element(by.css('.alert-success'));
  }
}
