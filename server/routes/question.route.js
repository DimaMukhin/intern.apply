const db = require('../database/db.service');
const validate = require('../services/question.validation.service');
const QuestionTitleError = require('../models/error/question/questionTitleError.model');
const QuestionBodyError = require('../models/error/question/questionBodyError.model');
const QuestionAuthorError = require('../models/error/question/questionAuthorError.model');
const IdError = require('../models/error/idError.model');
const UnknownError = require('../models/error/unkownError.model');

module.exports = (router) => {

  /**
   * GET all Q&A questions from the database
   */
  router.get('/question', (req, res) => {
    db.getAllQuestions((err, response, fields) => {
      if (err) res.status(400).send(err);
      else res.send(response);
    });
  });

  /**
   * GET a question by its id
   */
  router.get('/question/:id', (req, res) => {
    let errors = [];
    let questionID = req.params.id;

    if (!validate.validateID(questionID)) {
      errors.push(new IdError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      db.getQuestionById(req.params.id, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(response[0]);
      });
    }
  });

  /**
   * POST a new Q&A question
   * body format: { title: string, body: string, author: string }
   */
  router.post('/question', (req, res) => {
    let question = req.body;
    let errors = [];

    if (!validate.validateQuestionTitle(question.title)) {
      errors.push(new QuestionTitleError());
    }

    if (!validate.validateQuestionBody(question.body)) {
      errors.push(new QuestionBodyError());
    }

    if (!validate.validateQuestionAuthor(question.author)) {
      errors.push(new QuestionAuthorError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      db.addNewQuestion(question, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(question);
      });
    }
  });

  /**
   * POST a new answer to a question
   * body format: { questionId: int, body: string, author: string }
   */
  router.post('/question/:id/answers', (req, res) => {
    let answer = req.body;
    let errors = [];

    if (!validate.validateQuestionBody(answer.body)) {
      errors.push(new QuestionBodyError());
    }

    if (!validate.validateQuestionAuthor(answer.author)) {
      errors.push(new QuestionAuthorError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      db.addNewAnswer(answer, req.params.id, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(answer);
      });
    }
  });

  /**
   * GET answers for a specific question
   */
  router.get('/question/:id/answers', (req, res) => {
    let errors = [];
    let questionID = req.params.id;

    if (!validate.validateID(questionID)) {
      errors.push(new IdError());
    }

    if (errors.length > 0) {
      res.status(400).send(errors);
    }
    else {
      db.getAnswersByQuestion(questionID, (err, response, fields) => {
        if (err) res.status(400).send([new UnknownError()]);
        else res.send(response);
      });
    }
  })
};