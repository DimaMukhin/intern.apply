const Error = require('../error.model');

class JobScoreError extends Error {
  constructor(){
    super(32,'invalid job score');
  }
}

module.exports = JobScoreError;