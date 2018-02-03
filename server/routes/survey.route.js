const db = require('../database/db.service');

module.exports = (router) => {

    /**
     * GET all survey questions and the responses allowed for each question
     */
    router.get('/survey', (req, res) => {
        let errors = [];

        db.getAllSurveyResponses((err, surveyRes, fields) => {
            if (err) errors.push(err);
            else {
                db.getAllSurveyQuestions((err, questions, fields) => {
                    if (err) errors.push(err);
                    else {
                        questions.forEach(question => {
                            //for each question in the survey, add the responses associated with its question type
                            question["responses"] = surveyRes.filter(r => r["questionType"] == question["questionType"]).map(r => r["response"]);
                        });

                        if (errors.length > 0) res.status(400).send(errors);
                        else res.send(questions);
                    }
                });
            }
        });
    });

    /**
     * POST and save responses to a survey, array should contain the responses for each question, based on the order of the questions
     * and order of responses to the survey (ie. if the response is second option for the third question, answers[2] is 1)
     * body format: { answers: array<number> }
     */
    router.post('/survey', (req, res) => {
        let message = req.body;
        let errors = [];

        //make a new completed survey
        db.addCompleteSurvey((err, surveyRes, fields) => {
            if (err) errors.push(err);
            else {
                //save the response to each completed survey question
                message["answers"].forEach((answer, index) => {
                    db.addCompleteSurveyRes(surveyRes.insertId, index, answer, (err, response, fields) => {
                        if (err) errors.push(err);
                    });
                });

                if (errors.length > 0) res.status(400).send(errors);
                else res.send(message);
            }
        });
    });

};