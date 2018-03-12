let validation = {};

// Maximum values of the job form input fields 
const orgMax = 45,
    titleMax = 100,
    locMax = 45,
    descMax = 2000;
    jobScoreMax = 5;
    jobScoreMin = 1;

/**
 * Validate job organization
 * @param {string} organization the job organization to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobOrganization = (organization) => {
  if (!organization) {
    return false;
  }
  organization = organization.trim();
  return organization.length > 0 && organization.length < orgMax;
};

/**
 * Validate job title
 * @param {string} title the job title to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobTitle = (title) => {
  if (!title) {
    return false;
  }
  title = title.trim();
  return title.length > 0 && title.length < titleMax;
};

/**
 * Validate the job location
 * @param {string} location the job location to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobLocation = (location) => {
  if (!location) {
    return false;
  }
  location = location.trim();
  return location.length > 0 && location.length < locMax;
};

/**
 * Validate the job description
 * @param {string} description the body to validate
 * @returns true if valid OR false if invalid
 */
validation.validateJobDescription = (description) => {
  if (!description) {
    return false;
  }
  description = description.trim();
  return description.length > 0 && description.length < descMax;
};

/**
 * validate that the job ID is possible number
 * @param {number} id   the id to validate
 * @returns true if valid, false otherwise
 */
validation.validateJobID = (id) => {
  return !isNaN(id) && parseInt(Number(id), 10) == id && !isNaN(parseInt(id, 10)) && id > 0;
};

/**
 * validate a job salary
 * @param {string} salary the salary to validate
 * @returns true if valid, false otherwise
 */
validation.validateSalary = (salary) => {
    return !isNaN(salary) &&
        parseInt(Number(salary), 10) == salary &&
        !isNaN(parseInt(salary, 10)) &&
        salary > 0;
};

/**
 * validate a job salary type
 * @param {string} salaryType the salary type to validate
 * @returns true if valid, false otherwise
 */
validation.validateSalaryType = (salaryType) => {
    return !isNaN(salaryType) &&
        parseInt(Number(salaryType), 10) == salaryType &&
        !isNaN(parseInt(salaryType, 10)) &&
        salaryType >= 0 && salaryType <= 3;
}

/**
 * validate job score
 * @param score
 */
validation.validateJobScore = (score) => {
  return validation.validateJobID(score) && score <= jobScoreMax && score >= jobScoreMin;
};

module.exports = validation;
