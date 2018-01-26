const db = require('../database/db.service');

module.exports = (router) => {

  /**
   * GET all "contact-us" messages from the database
   */
  router.get('/contactMessage', (req, res) => {
    db.getAllContactMessages((err, response, fields) => {
      if (err) res.status(400).send(err);
      else res.send(response);
    });
  });

  /**
   * POST a new contact message
   * body format: { email: string, title: string, message: string }
   */
  router.post('/contactMessage', (req, res) => {
    let message = req.body;
    db.addNewContactMessage(message, (err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(response);
    });
  });
};
