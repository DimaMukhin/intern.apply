const Error = require('../error.model');

class UnknownError extends Error {
  constructor(){
    super(0,'unknown error');
  }
}

module.exports = UnknownError;