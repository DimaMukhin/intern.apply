const db = require('../database/db.service');

module.exports = (router) => {

  /**
   * GET all employers from the database
   */
  router.get('/job', (req, res) => {
    let filter = req.query.filter;
 
    if(filter)
    {
      db.getFilteredJobs(filter,(err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
      });
    }
    else
    {
      db.getAllJobs((err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
      });
    }
  });

};
