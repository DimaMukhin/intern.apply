const Error = require('../error.model');

class EmailError extends Error {
  constructor(){
    super(1,'invalid email address');
  }
}

module.exports = EmailError;