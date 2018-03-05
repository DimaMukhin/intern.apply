let validation = {};

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

module.exports = validation;