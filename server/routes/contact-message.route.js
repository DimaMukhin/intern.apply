const db = require('../database/db.service');
const validate = require('../services/validation.service');

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
    let error = {
      set: 0,
      errors: []
    };

    if (!validate.validateEmail(message.email)) {
      error.set = 1;
      error.errors.push({code: 1, message: 'invalid email address'});
    }

    if (!validate.validateContactMessageTitle(message.title)) {
      error.set = 1;
      error.errors.push({code: 2, message: 'invalid title'});
    }

    if (!validate.validateContactMessageBody(message.message)) {
      error.set = 1;
      error.errors.push({code: 3, message: 'invalid message body'});
    }

    if (error.set == 1) {
      res.status(400).send(error);
    } else {
      db.addNewContactMessage(message, (err, response, fields) => {
        if (err) res.status(400).send(err);
        else res.send(message);
      });
    }
  });
};
