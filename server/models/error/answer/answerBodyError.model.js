const Error = require('../error.model');

class AnswerBodyError extends Error {
  constructor(){
    super(34, 'invalid answer body');
  }
}

module.exports = AnswerBodyError;