const Error = require('../error.model');

class CommentMessageError extends Error {
  constructor(){
    super(5,'invalid comment message');
  }
}

module.exports = CommentMessageError;