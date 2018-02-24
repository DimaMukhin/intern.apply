const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

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
    let errors = [];

    if (!validate.validateEmail(message.email)) {
      errors.push(new Error(1));
    }

    if (!validate.validateContactMessageTitle(message.title)) {
      errors.push(new Error(2));
    }

    if (!validate.validateContactMessageBody(message.message)) {
      errors.push(new Error(3));
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      db.addNewContactMessage(message, (err, response, fields) => {
        if (err) res.status(400).send([new Error(0)]);
        else res.send(message);
      });
    }
  });
};