
let validation = {};

// Maximum values of the job form input fields 
const orgMax = 45,
    titleMax = 100,
    locMax = 45,
    descMax = 2000;

    
/**
 * validate an email address string
 * @param {string} email email address string to validate 
 * @returns true if valid, false otherwise
 */
validation.validateEmail = (email) => {
    if (!email) return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length < 25;
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

/**
 * Validate job organization
 * @param {string} organization the job organization to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobOrganization = (organization) => {
    if (!organization) return false;
    return organization.length > 0 && organization.length < orgMax;
};

/**
 * Validate job title 
 * @param {string} title the job title to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobTitle = (title) => {
    if (!title) return false;
    return title.length > 0 && title.length < titleMax;
};

/**
 * Validate the job location 
 * @param {string} location the job location to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobLocation = (location) => {
    if (!location) return false;
    return location.length > 0 && location.length < locMax;
};

/**
 * Validate the job description
 * @param {string} body the body to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobDescription = (description) => {
    if (!description) return false;
    return description.length > 0 && description.length < descMax;
};

module.exports = validation;