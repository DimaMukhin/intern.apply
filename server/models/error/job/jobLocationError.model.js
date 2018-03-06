const Error = require('../error.model');

class JobLocationError extends Error {
  constructor(){
    super(13,'invalid job location');
  }
}

module.exports = JobLocationError;