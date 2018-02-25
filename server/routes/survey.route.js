const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

module.exports = (router) => {

    /**
     * GET all survey questions and the responses allowed for each question
     */
    router.get('/survey', (req, res) => {
        db.getAllSurveyQuestions((err, response, fields) => {
            if (err) res.status(400).send(err);
            else {
                response.forEach(question => {
                    //the responses are returned db as a string separated by ';'
                    question["responses"] = question["responses"].split(";");
                });
                res.send(response);
            }
        });
    });

    /**
     * POST and save responses to a survey, array should contain the responses for each question, based on the order of the questions
     * (ie. if the response is second option for the third question, answers[2] is second option)
     * body format: { answers: array<String> }
     */
    router.post('/survey', (req, res) => {
        let survey = req.body;
        let errors = [];

        if (!validate.validateSurvey(survey.answers)) {
            errors.push(new Error(51));
        }

        //make a new completed survey
        if (errors.length > 0) 
            res.status(400).send(errors);
        else {
            db.addCompleteSurvey((err, surveyRes, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else {
                    //save the response to each completed survey question
                    survey["answers"].forEach((answer, index) => {
                        db.addCompleteSurveyRes(surveyRes.insertId, index, answer, (err, response, fields) => {
                            if (err) errors.push(err);
                        });
                    });

                    if (errors.length > 0) res.status(400).send([new Error(0)]);
                    else res.send(survey);
                }
            });
        }
    });

};