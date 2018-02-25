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
    if (!email) {
        return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length < 25;
};

/**
 * validate a contact-us message title
 * @param {string} title the title to validate
 * @returns true if valid, false otherwise
 */
validation.validateContactMessageTitle = (title) => {
    if (!title) {
        return false;
    }
    title = title.trim();
    return title.length > 0 && title.length < 25;
};

/**
 * validate the body of a contact-us message
 * @param {string} body the body to validate
 * @returns true if valid, false otherwise
 */
validation.validateContactMessageBody = (body) => {
    if (!body) {
        return false;
    }
    body = body.trim();
    return body.length > 0 && body.length < 300;
};

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
 * Validate that id is an actual number
 * @param {int} id
 * @returns true if valid OR false if invalid
 */
validation.validateID = (id) => {
    // validates that id contains only an integer
    return !isNaN(parseInt(id)) && isFinite(id) && !(/^\s/.test(id)) && Number.isInteger(parseFloat(id)) && id > 0;
};

/**
 * validate that the job ID is possible number
 * @param {number} id   the id to validate
 * @returns true if valid, false otherwise
 */
validation.validateJobID = (id) => {
    return !isNaN(id) &&
        parseInt(Number(id), 10) == id &&
        !isNaN(parseInt(id, 10)) &&
        id > 0;
};

/**
 * validate the message of a comment
 * @param {string} message  the message to validate
 * @returns true if valid, false otherwise
 */
validation.validateCommentMessage = (message) => {
    if (!message) {
        return false;
    }
    message = message.trim();
    return message.length > 0 && message.length < 300;
};

/**
 * validate the name of the comment author
 * @param {string} author   the name to validate
 * @returns true if valid, false otherwise
 */
validation.validateCommentAuthor = (author) => {
    if (!author) {
        return false;
    }
    author = author.trim();
    return author.length > 0 && author.length < 25;
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
* validate a survey's selected responses, where null is used to denote a non selection
* @param {array} survey the survey to validate
* @returns true if valid, false otherwise
*/
validation.validateSurvey = (survey) => {
    if (!survey) {
        return false;
    }
    // return true if no null is found in the survey responses and non empty
    return survey.length > 0 && survey.findIndex(k => k == null) == -1
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
    return title.length > 0 && title.length < 25;
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