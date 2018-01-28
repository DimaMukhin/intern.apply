
let validation = {};

/**
 * validate an email address string
 * @param {string} email email address string to validate 
 * @returns true if valid, false otherwise
 */
validation.validateEmail = (email) => {
    if (!email) return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

/**
 * validate a contact-us message title
 * @param {string} title the title to validate
 * @returns true if valid, false otherwise
 */
validation.validateContactMessageTitle = (title) => {
    if (!title) return false;
    return title.length > 0 && title.length < 25;
};

/**
 * validate the body of a contact-us message
 * @param {string} body the body to validate
 * @returns true if valid, false otherwise
 */
validation.validateContactMessageBody = (body) => {
    if (!body) return false;
    return body.length > 0 && body.length < 300;
};

module.exports = validation;