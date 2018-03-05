let validation = {};

/**
 * validate the message of a comment
 * @param {string} message  the message to validate
 * @returns true if valid, false otherwise
 */
validation.validateCommentMessage = (message) => {
  if (!message) {
    return false;
  }
  message = message.trim();
  return message.length > 0 && message.length < 300;
};

/**
 * validate the name of the comment author
 * @param {string} author   the name to validate
 * @returns true if valid, false otherwise
 */
validation.validateCommentAuthor = (author) => {
  if (!author) {
    return false;
  }
  author = author.trim();
  return author.length > 0 && author.length < 25;
};

module.exports = validation;