const db = require('../database/db.service');
const jobFormValidate = require('../services/job-form-validation.service');
const JobFormError = require('../models/job-form-errors.model');

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

<<<<<<< HEAD
  /**
   * POST job to the database
   */
  router.post('/job', (req, res) => {
    let job = req.body;
    let errors = [];

    if (!jobFormValidate.validateJobOrganization(job.organization)) {
      errors.push(new JobFormError(1));
    }

    if (!jobFormValidate.validateJobTitle(job.title)) {
      errors.push(new JobFormError(2));
    }

    if (!jobFormValidate.validateJobLocation(job.location)) {
      errors.push(new JobFormError(3));
    }

    if (!jobFormValidate.validateJobDescription(job.description)) {
      errors.push(new JobFormError(4));
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      db.addJob(req.body, (err, response, fields) => {
        if (err) {
          res.status(400).send([new JobFormError(0)]);
        }
        else {
          res.send(response);
        }
      });
    }


  });

=======
  router.post('/job/filter', (req, res) => {
    db.getFilteredJobs(req.body, (err, response, fields) => {
      if (err) throw err;
      else res.send(response);
    });
  });
>>>>>>> master
};
