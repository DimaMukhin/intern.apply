const Error = require('../error.model');

class MessageBodyError extends Error {
  constructor(){
    super(3,'invalid message body');
  }
}

module.exports = MessageBodyError;