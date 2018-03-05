const db = require('../database/db.service');
const cmntValidate = require('../services/comment.validation.service');
const jobValidate = require('../services/job.validation.service');
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

        if (!jobValidate.validateJobID(comment.jobID)) {
            errors.push(new Error(4));
        }

        if (!cmntValidate.validateCommentMessage(comment.message)) {
            errors.push(new Error(5));
        }

        if (!cmntValidate.validateCommentAuthor(comment.author)) {
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