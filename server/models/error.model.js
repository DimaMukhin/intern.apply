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
    3: 'invalid message body',
    4: 'invalid jobID',
    5: 'invalid comment message',
    6: 'invalid comment author name',
    11: 'invalid job organization',
    12: 'invalid job title',
    13: 'invalid job location',
    14: 'invalid job description',
    31: 'invalid id',
    32: 'invalid job score',
    41: 'invalid salary',
    42: 'unknown salary type',
    51: 'invalid survey'
};

class Error {
    constructor(code) {
        this.code = code;
        this.message = codes[code];
    }

}

module.exports = Error;