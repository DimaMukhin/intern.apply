const Error = require('../error.model');

class questionAuthorError extends Error {
  constructor(){
    super(9, 'invalid question author');
  }
}

module.exports = questionAuthorError;