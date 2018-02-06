/**
 * Server error class
 * use this class to set the error code and message of a server error.
 * used to keep track of errors responses to http requests.
 */

/**
 * all error codes and messages
 */
const codes = {
    0: 'unknown error',
    1: 'invalid email address',
    2: 'invalid message title',
    3: 'invalid message body'
};

class Error {

    constructor(code) {
        this.code = code;
        this.message = codes[code];
    }

}

module.exports = Error;