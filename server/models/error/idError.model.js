const Error = require('../error.model');

class IdError extends Error {
  constructor(){
    super(31,'invalid id');
  }
}

module.exports = IdError;