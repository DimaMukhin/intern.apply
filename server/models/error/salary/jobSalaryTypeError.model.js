const Error = require('../error.model');

class JobSalaryTypeError extends Error {
  constructor(){
    super(42,'unknown salary type');
  }
}

module.exports = JobSalaryTypeError;