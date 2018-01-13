module.exports = (router) => {

  /**
   * GET all employers from the database
   */
  router.get('/employer', (req, res) => {
    db.query(`SELECT * FROM Persons`, (err, qres, fields) => {
      if (err) res.status(400).send(err);
      else {
        res.send(qres);
      }
    });
  });

};
