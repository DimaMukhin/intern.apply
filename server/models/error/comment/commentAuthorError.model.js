const Error = require('../error.model');

class CommentAuthorError extends Error {
  constructor(){
    super(6,'invalid comment author name');
  }
}

module.exports = CommentAuthorError;