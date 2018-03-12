let validation = {};

/**
 * Validate that id is an actual number
 * @param {int} id
 * @returns true if valid OR false if invalid
 */
validation.validateID = (id) => {
    // validates that id contains only an integer
    return !isNaN(parseInt(id)) && isFinite(id) && !(/^\s/.test(id)) && Number.isInteger(parseFloat(id)) && id > 0;
};

/**
 * validate the title of a Q&A question
 * @param {string} title   the title to validate
 * @returns true if valid, false otherwise
 */
validation.validateQuestionTitle = (title) => {
    if (!title) {
        return false;
    }
    title = title.trim();
    return title.length > 0 && title.length < 45;
};

/**
 * validate the body of a Q&A question
 * @param {string} body  the question body to validate
 * @returns true if valid, false otherwise
 */
validation.validateQuestionBody = (body) => {
    if (!body) {
        return false;
    }
    body = body.trim();
    return body.length > 0 && body.length < 1000;
};

/**
 * validate the name of the Q&A question author
 * @param {string} author   the name to validate
 * @returns true if valid, false otherwise
 */
validation.validateQuestionAuthor = (author) => {
    if (!author) {
        return false;
    }
    author = author.trim();
    return author.length > 0 && author.length < 25;
};

module.exports = validation;
