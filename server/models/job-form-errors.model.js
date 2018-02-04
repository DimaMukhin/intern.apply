/**
 * Job Form Server error class
 * used to keep track of errors responses to http requests for the job form.
 */

/**
 * Error codes for the job form
 */
const codes = {
    0: 'unknown error',
    1: 'invalid job organization',
    2: 'invalid job title',
    3: 'invalid job location',
    4: 'invalid job description'
};

class JobFormError {
    constructor(code) {
        this.code = code;
        this.message = codes[code];
    }
}

module.exports = JobFormError;