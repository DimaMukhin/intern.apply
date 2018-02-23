const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

module.exports = (router) => {

    /**
     * GET all comments from the database
     */
    router.get('/comment', (req, res) => {
      db.getAllComments((err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
      });
    });

    /**
     * POST a new comment
     * body format: { jobID: number, message: string, author: string }
     */
    router.post('/comment', (req, res) => {
        let comment = req.body;
        let errors = [];

        if (!validate.validateJobID(comment.jobID)) {
            errors.push(new Error(4));
        }

        if (!validate.validateCommentMessage(comment.message)) {
            errors.push(new Error(5));
        }

        if (!validate.validateCommentAuthor(comment.author)) {
            errors.push(new Error(6));
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.addNewComment(comment, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else res.send(comment);
            });
        }
    });
};