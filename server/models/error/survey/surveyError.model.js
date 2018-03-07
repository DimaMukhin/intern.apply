const Error = require('../error.model');

class SurveyError extends Error {
  constructor(){
    super(51,'invalid survey');
  }
}

module.exports = SurveyError;