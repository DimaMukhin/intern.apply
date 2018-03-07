const Error = require('../error.model');

class JobTitleError extends Error {
  constructor(){
    super(12,'invalid job title');
  }
}

module.exports = JobTitleError;