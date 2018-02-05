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
      db.addJob(req.body, (err, response, fields) => {
        if (err) {
          res.status(400).send([new Error(0)]);
        }
        else {
          res.send(response);
        }
      });
    }


  });

};
