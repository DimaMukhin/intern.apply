const Error = require('../error.model');

class JobSalaryError extends Error {
  constructor(){
    super(41,'invalid salary');
  }
}

module.exports = JobSalaryError;