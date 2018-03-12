const Error = require('../error.model');

class questionTitleError extends Error {
  constructor(){
    super(7, 'invalid question title');
  }
}

module.exports = questionTitleError;