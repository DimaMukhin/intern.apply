const Error = require('../error.model');

class JobUrlError extends Error {
    constructor() {
        super(15, 'invalid job URL');
    }
}

module.exports = JobUrlError;