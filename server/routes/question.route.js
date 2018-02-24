const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

module.exports = (router) => {

    /**
     * GET all Q&A questions from the database
     */
    router.get('/question', (req, res) => {
        db.getAllQuestions((err, response, fields) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

    /**
     * GET a question by its id
     */
    router.get('/question/:id', (req, res) => {
        let errors = [];
        let questionID = req.params.id;

        if (!validate.validateID(questionID)) {
            errors.push(new Error(31));
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.getQuestionById(req.params.id, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else res.send(response[0]);
            });
        }
    });

    /**
     * POST a new Q&A question
     * body format: { title: string, body: string, author: string }
     */
    router.post('/question', (req, res) => {
        let question = req.body;
        let errors = [];

        if (!validate.validateQuestionTitle(question.title)) {
            errors.push(new Error(7));
        }

        if (!validate.validateQuestionBody(question.body)) {
            errors.push(new Error(8));
        }

        if (!validate.validateQuestionAuthor(question.author)) {
            errors.push(new Error(9));
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.addNewQuestion(question, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else res.send(question);
            });
        }
    });

};