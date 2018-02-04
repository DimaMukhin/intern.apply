
let jobFormValidation = {};

// Maximum values of the job form input fields 
const orgMax = 45,
    titleMax = 100,
    locMax = 45,
    descMax = 2000;

/**
 * Validate job organization
 * @param {string} organization the job organization to validate
 * @returns true if valid OR false if invalid
 */
jobFormValidation.validateJobOrganization = (organization) => {
    if (!organization) return false;
    return organization.length > 0 && organization.length < orgMax;
};

/**
 * Validate job title 
 * @param {string} title the job title to validate
 * @returns true if valid OR false if invalid
 */
jobFormValidation.validateJobTitle = (title) => {
    if (!title) return false;
    return title.length > 0 && title.length < titleMax;
};

/**
 * Validate the job location 
 * @param {string} location the job location to validate
 * @returns true if valid OR false if invalid
 */
jobFormValidation.validateJobLocation = (location) => {
    if (!location) return false;
    return location.length > 0 && location.length < locMax;
};

/**
 * Validate the job description
 * @param {string} body the body to validate
 * @returns true if valid OR false if invalid
 */
jobFormValidation.validateJobDescription = (description) => {
    if (!description) return false;
    return description.length > 0 && description.length < descMax;
};

module.exports = jobFormValidation;