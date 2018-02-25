const express = require('express');
const router = express.Router();

/**
 * API Health status
 */
router.get('/', (req, res) => {
  res.status(200).send('ok');
});

// setting up all api routes
require('./routes/job.route')(router);
require('./routes/survey.route')(router);
require('./routes/contact-message.route')(router);
require('./routes/comment.route')(router);
require('./routes/question.route')(router);

// development playground
// require('./playground');

module.exports = router;