const employerModel = require('../models/employer/employer.model');

module.exports = (router) => {

  /**
   * GET all employers from the database
   */
  router.get('/employer', (req, res) => {
    employerModel.findAllEmployers().then((employers) => {
      res.send(employers);
    }).catch((error) => {
      res.status(400).send(error);
    });
  });

};
