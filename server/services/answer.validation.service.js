let validation = {};

/**
 * validate the body of a Q&A answer
 * @param {string} body  the question body to validate
 * @returns true if valid, false otherwise
 */
validation.validateAnswerBody = (body) => {
  if (!body) {
    return false;
  }
  body = body.trim();
  return body.length > 0 && body.length < 1000;
};

/**
 * validate the name of the Q&A answer author
 * @param {string} author   the name to validate
 * @returns true if valid, false otherwise
 */
validation.validateAnswerAuthor = (author) => {
  if (!author) {
    return false;
  }
  author = author.trim();
  return author.length > 0 && author.length < 25;
};

module.exports = validation;