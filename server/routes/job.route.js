const db = require('../database/db.service');

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
    db.addJob(req.body, (err, response, fields) => {
      if (err) throw err;
      else res.send(response);
    });
  });

};
