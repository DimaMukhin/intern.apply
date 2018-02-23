const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

module.exports = (router) => {

    /**
     * GET all employers from the database
     */
    router.get('/job', (req, res) => {
        db.getAllJobs((err, response, fields) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

    /**
     * GET a job from the db with an specific id
     */
    router.get('/job/:id', (req, res) => {
        let errors = [];

        //lets validate that id is an actual number first
        if (!validate.validateID(req.params.id)) {
            errors.push(new Error(31));
        }

        // good to go if no errors found
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.getJob(req.params.id, (err, response, fields) => {
                if (err) {
                    // unknown error
                    errors.push(new Error(0));
                    res.status(400).send(errors);
                } else {
                    res.send(response);
                }
            })
        }
    });

    /**
     * GET all comments of a job
     */
    router.get('/job/:id/comments', (req, res) => {
        let id = req.params.id;
        db.getAllCommentsOfJob(id, (err, response, fields) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

    /**
     * POST job to the database
     */
    router.post('/job', (req, res) => {
        let job = req.body;
        let errors = [];

        if (!validate.validateJobOrganization(job.organization)) {
            errors.push(new Error(11));
        }

        if (!validate.validateJobTitle(job.title)) {
            errors.push(new Error(12));
        }

        if (!validate.validateJobLocation(job.location)) {
            errors.push(new Error(13));
        }

        if (!validate.validateJobDescription(job.description)) {
            errors.push(new Error(14));
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.addJob(job, (err, response, fields) => {
                if (err) {
                    res.status(400).send([new Error(0)]);
                }
                else {
                    res.send(job);
                }
            });
        }
    });

    /*
      GET a specific job rating
     */
    router.get('/job/:id/rating', (req, res) => {
        let errors = [];

        //lets validate that id is an actual number first
        if (!validate.validateJobID(req.params.id)) {
            errors.push(new Error(31));
        }

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.getJobRating(req.params.id, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else res.send(response);
            })
        }
    });

    /*
     POST a job rating
     */
    router.post('/job/:id/rate', (req, res) => {
        let errors = [];

        //lets validate that id is an actual number first
        if (!validate.validateJobID(req.params.id)) {
            errors.push(new Error(31));
        }

        //lets validate that job score is an actual number
        if (!validate.validateJobScore(req.body.score)) {
            errors.push(new Error(32));
        }

        if(errors.length > 0){
            res.status(400).send(errors);
        } else {
            db.rateJob(req.params.id, req.body.score, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else res.send(response);
            })
        }
    })
};