const Error = require('../error.model');

class questionBodyError extends Error {
  constructor(){
    super(8, 'invalid question body');
  }
}

module.exports = questionBodyError;