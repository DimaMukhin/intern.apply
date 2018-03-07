const Error = require('../error.model');

class MessageTitleError extends Error {
  constructor(){
    super(2,'invalid message title');
  }
}

module.exports = MessageTitleError;