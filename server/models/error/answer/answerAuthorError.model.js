const Error = require('../error.model');

class AnswerAuthorError extends Error {
  constructor(){
    super(33, 'invalid answer author');
  }
}

module.exports = AnswerAuthorError;