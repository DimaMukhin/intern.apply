const Error = require('../error.model');

class JobDescriptionError extends Error {
  constructor(){
    super(14,'invalid job description');
  }
}

module.exports = JobDescriptionError;