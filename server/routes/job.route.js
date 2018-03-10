const db = require('../database/db.service');
const validate = require('../services/job.validation.service');
const JobRating = require('../models/jobRating.model');
const IdError = require('../models/error/idError.model');
const JobTitleError = require('../models/error/job/jobTitleError.model');
const JobLocationError = require('../models/error/job/jobLocationError.model');
const JobDescriptionError = require('../models/error/job/jobDescriptionError.model');
const JobOrganizationError = require('../models/error/job/jobOrganizationError.model');
const JobUrlError = require('../models/error/job/jobUrlError.model');
const JobScoreError = require('../models/error/job/jobScoreError.model');
const UnknownError = require('../models/error/unkownError.model');

module.exports = (router) => {

  /**
   * GET all employers from the database
   * If provided filter, gets the filtered jobs
   */
  router.get('/job', (req, res) => {
    let filter = req.query.filter;
    if (filter) {
      db.getFilteredJobs(filter, (err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
      });
    }
    else {
      db.getAllJobs((err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
      });
    }
  });

  /**
   * GET a job from the db with an specific id
   */
  router.get('/job/:id', (req, res) => {
    let errors = [];

    //lets validate that id is an actual number first
    if (!validate.validateJobID(req.params.id)) {
      errors.push(new IdError());
    }

    // good to go if no errors found
    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      db.getJob(req.params.id, (err, response, fields) => {
        if (err) {
          // unknown error
          errors.push(new UnknownError());
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
      errors.push(new JobOrganizationError());
    }

    if (!validate.validateJobTitle(job.title)) {
      errors.push(new JobTitleError());
    }

    if (!validate.validateJobLocation(job.location)) {
      errors.push(new JobLocationError());
    }

    if (!validate.validateJobDescription(job.description)) {
      errors.push(new JobDescriptionError());
    }

    if (!validate.validateJobUrl(job.url)) {
      errors.push(new JobUrlError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      db.addJob(job, (err, response, fields) => {
        if (err) {
          res.status(400).send([new UnknownError()]);
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
      errors.push(new IdError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      db.getJobRating(req.params.id, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(response);
      });
    }
  });

  /*
   POST a job rating
   */
  router.post('/job/:id/rating', (req, res) => {
    let errors = [];
    let newRating;

    //lets validate that id is an actual number first
    if (!validate.validateJobID(req.params.id)) {
      errors.push(new IdError());
    }

    //lets validate that job score is an actual number
    if (!validate.validateJobScore(req.body.score)) {
      errors.push(new JobScoreError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      //getting the job rating to calculate the new rating
      db.getJobRating(req.params.id, (err, rating, fields) => {
        if (err) {
          res.status(400).send([new UnknownError()]);
        }
        else {
          //lets calculate the new average score
          if (rating.length > 0)
            newRating = new JobRating(rating[0].score, rating[0].votes);
          else
            newRating = new JobRating(0, 0);

          newRating.addVote(req.body.score);

          db.rateJob(req.params.id, newRating.getScore(), newRating.getVotes(), (err, response, fields) => {
            if (err) res.status(400).send([new UnknownError()]);
            else res.send(newRating);
          });
        }
      });
    }
  })
};