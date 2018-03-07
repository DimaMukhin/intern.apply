const Error = require('../error.model');

class JobIdError extends Error {
  constructor(){
    super(4,'invalid jobID');
  }
}

module.exports = JobIdError;