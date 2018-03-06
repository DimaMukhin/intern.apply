const Error = require('../error.model');

class JobOrganizationError extends Error {
  constructor(){
    super(11,'invalid job organization');
  }
}

module.exports = JobOrganizationError;