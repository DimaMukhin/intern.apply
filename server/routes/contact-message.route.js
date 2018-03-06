const db = require('../database/db.service');
const validate = require('../services/contact-message.validation.service');
const EmailError = require('../models/error/contact-us/emailError.model');
const MessageTitleError = require('../models/error/contact-us/messageTitleError.model');
const MessageBodyError = require('../models/error/contact-us/messageBodyError.model');
const UnknownError = require('../models/error/unkownError.model');

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
      errors.push(new EmailError());
    }

    if (!validate.validateContactMessageTitle(message.title)) {
      errors.push(new MessageTitleError());
    }

    if (!validate.validateContactMessageBody(message.message)) {
      errors.push(new MessageBodyError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      db.addNewContactMessage(message, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(message);
      });
    }
  });
};