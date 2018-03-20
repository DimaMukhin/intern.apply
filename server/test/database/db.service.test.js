const expect = require('chai').expect;
const mysql = require('mysql2');
const fs = require('fs');

const db = require('../db.connection.test');


describe('db.service.js', () => {

  describe('ContactMessage', () => {

    beforeEach((done) => {
      fs.readFile('test/contactMessage.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    describe('getAllContactMessages', () => {

      it('should return 3 contact message records', (done) => {
        db.getAllContactMessages((err, res, fields) => {
          expect(res).to.have.lengthOf(3);
          done();
        });
      });

      it('should return the correct first record', (done) => {
        db.getAllContactMessages((err, res, fields) => {
          let firstRecord = res[0];
          expect(firstRecord.id).to.equal(1);
          expect(firstRecord.email).to.equal('dima@gmail.com');
          expect(firstRecord.title).to.equal('test title');
          expect(firstRecord.message).to.equal('test body');
          done();
        });
      });
    });

    describe('addNewContactMessage', () => {

      it('should create a new contact message', (done) => {
        db.addNewContactMessage({
          id: 4,
          email: 'test@email.com',
          title: 'test title 4',
          message: 'test body 4'
        }, (err, res, fields) => {
          db.getAllContactMessages((err, res, fields) => {
            expect(res).to.have.lengthOf(4);
            done();
          });
        });
      });

      it('should not create a new contact message with an undefined email', (done) => {
        db.addNewContactMessage({
          id: 4,
          email: undefined,
          title: 'test title 4',
          message: 'test body 4'
        }, (err, res, fields) => {
          db.getAllContactMessages((err, res, fields) => {
            expect(res).to.have.lengthOf(3);
            done();
          });
        });
      });

      it('should not create a new contact message with an already existing id', (done) => {
        db.addNewContactMessage({
          id: 3,
          email: 'test@email.com',
          title: 'test title 4',
          message: 'test body 4'
        }, (err, res, fields) => {
          db.getAllContactMessages((err, res, fields) => {
            expect(res).to.have.lengthOf(3);
            done();
          });
        });
      });
    });
  });

  describe('GetJobs', () => {

    beforeEach((done) => {
      fs.readFile('test/job.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    describe('getJob', () => {

      it('it should get one job with the id 2', (done) => {
        db.getJob(2, (err, res, fields) => {
          expect(res).to.have.lengthOf(1);
          let job = res[0];

          expect(job.id).to.equal(2);
          done();
        });
      });

      it('it should not get a job with a non existent id', (done) => {
        db.getJob({ id: 999 }, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });

    describe('getAllJobs', () => {

      it('should return 3 jobs records', (done) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(3);
          done();
        });
      });

      it('should return the correct first record', (done) => {
        db.getAllJobs((err, res, fields) => {
          let firstRecord = res[0];
          expect(firstRecord.id).to.equal(1);
          expect(firstRecord.organization).to.equal('Facebook');
          expect(firstRecord.title).to.equal('test title');
          expect(firstRecord.location).to.equal('winnipeg');
          done();
        });
      });
    });
  });

  describe('GetFilteredJobs', () => {

    beforeEach((done) => {
      fs.readFile('test/job2.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });


    it('should return 3 jobs records', (done) => {
      db.getFilteredJobs("Soft", (err, res, fields) => {

        expect(res).to.have.lengthOf(3);
        done();
      });
    });

    it('should return the correct first record', (done) => {
      db.getFilteredJobs("Soft", (err, res, fields) => {
        let firstRecord = res[0];
        expect(firstRecord.id).to.equal(1);
        expect(firstRecord.organization).to.equal('Facebook');
        expect(firstRecord.title).to.equal('Software Engineer');
        expect(firstRecord.location).to.equal('winnipeg');
        done();
      });
    });

    it('should return nothing', (done) => {
      db.getFilteredJobs("Random Text", (err, res, fields) => {
        expect(res).to.have.lengthOf(0);
        done();
      });
    });

  });

  describe('addJob', () => {

    beforeEach((done) => {
      fs.readFile('test/job3.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    it('it should add the new job', (done) => {
      db.addJob({
        id: 5,
        organization: 'Test Syndicate',
        title: 'i am a test for add job',
        location: '10 Test Square',
        description: 'I am a description',
        url: 'https://www.testUrl.com'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(5);
          let addedJob = res[4];

          expect(addedJob.id).to.equal(5);
          expect(addedJob.organization).to.equal('Test Syndicate');
          expect(addedJob.title).to.equal('i am a test for add job');
          expect(addedJob.location).to.equal('10 Test Square');
          expect(addedJob.description).to.equal('I am a description');
          expect(addedJob.url).to.equal('https://www.testUrl.com');
          done();
        });
      });
    });

    it('it should not add a job without an organization', (done) => {
      db.addJob({
        id: 5,
        organization: undefined,
        title: 'i am a test for add job',
        location: '10 Test Square',
        description: 'I am a description',
        url: 'https://www.testUrl.com'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('it should not add a job without a title', (done) => {
      db.addJob({
        id: 5,
        organization: 'Super Test Squad',
        title: undefined,
        location: '10 Test House',
        description: 'I am a description',
        url: 'https://www.testUrl.com'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('it should not add a job without a location', (done) => {
      db.addJob({
        id: 5,
        organization: 'Super Test Squad',
        title: 'cool title',
        location: undefined,
        description: 'I am a description',
        url: 'https://www.testUrl.com'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('it should not add a job without a description', (done) => {
      db.addJob({
        id: 5,
        organization: 'Super Test Squad',
        title: 'sick title',
        location: '20 Test Mansion',
        description: undefined,
        url: 'https://www.testUrl.com'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('it should not add a job without a URL', (done) => {
      db.addJob({
        id: 5,
        organization: 'Super Test Squad',
        title: 'sick title',
        location: '20 Test Mansion',
        description: 'I am a description',
        url: undefined
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('it should not add a job with a duplicate id', (done) => {
      db.addJob({
        id: 1,
        organization: 'Return of Test',
        title: 'Test Test Test',
        location: '101 Test Disco',
        description: 'I am not a description'
      }, (err, res, fields) => {
        db.getAllJobs((err, res, fields) => {
          expect(res).to.have.lengthOf(4);
          done();
        });
      });
    });
  });

  describe('comments', () => {

    beforeEach((done) => {
      fs.readFile('test/job.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          fs.readFile('test/comment.sql', "utf8", function (err, comData) {
            db.conn.query(comData, (err, res) => {
              done();
            });
          });
        });
      });
    });

    afterEach((done) => {
      db.conn.query('DROP TABLE IF EXISTS comment', (err, res) => {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
          done();
        });
      });
    });

    describe('getAllComments', () => {
      it('should return 3 comments', (done) => {
        db.getAllComments((err, res, fields) => {
          expect(res).to.have.lengthOf(3);
          done();
        });
      });

      it('should return the correct first comment', (done) => {
        db.getAllComments((err, res, fields) => {
          let firstRecord = res[0];
          expect(firstRecord.id).to.equal(1);
          expect(firstRecord.jobID).to.equal(1);
          expect(firstRecord.message).to.equal('this is a nice comment body');
          expect(firstRecord.author).to.equal('dima');
          done();
        });
      });
    });

    describe('getAllCommentsOfJob', () => {
      it('should return all the comments of job 1', (done) => {
        db.getAllCommentsOfJob(1, (err, res, fields) => {
          expect(res).to.have.lengthOf(2);

          let comment1 = res[0];
          expect(comment1.message).to.equal('this is a nice comment body');
          expect(comment1.author).to.equal('dima');

          let comment2 = res[1];
          expect(comment2.message).to.equal('another comment for the same job');
          expect(comment2.author).to.equal('ben');

          done();
        });
      });

      it('should return no comments for job 3', (done) => {
        db.getAllCommentsOfJob(3, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });

    describe('addNewComment', () => {
      it('should add a new valid comment', (done) => {
        db.addNewComment({ jobID: 2, message: 'test message', author: 'dima' }, (err, res, fields) => {
          expect(err).to.be.null;
          done();
        });
      });

      it('should not add a valid comment to an unexisting job', (done) => {
        db.addNewComment({ jobID: 4, message: 'should fail', author: 'ddd' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a comment with invalid message body', (done) => {
        db.addNewComment({ jobID: 1, message: undefined, author: 'ddd' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a comment with invalid author name', (done) => {
        db.addNewComment({ jobID: 1, message: 'should fail', author: undefined }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a comment with an existing id', (done) => {
        db.addNewComment({ id: 1, jobID: 1, message: 'should fail', author: 'ddd' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });
    });
  });

  describe('addSalary', () => {

    beforeEach((done) => {
      fs.readFile('test/job.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    describe('addSalary', () => {

      it('should add salary to job with proper average', (done) => {
        db.addSalaryToJob(1, 6.6, (err, res, fields, newSalary, newNumOfSalary) => {
          expect(newSalary).to.equal('5.3');
          expect(newNumOfSalary).to.equal(2);
          db.getJob(1, (err, res, fields) => {
            expect(res).to.have.lengthOf(1);
            expect(res[0].numSalaries).to.equal(2);
            expect(res[0].salary).to.equal('5.3');
            done();
          });
        });
      });

      it('should add first salary properly to the job', (done) => {
        db.addSalaryToJob(3, 6, (err, res, fields, newSalary, newNumOfSalary) => {
          expect(newSalary).to.be.equal('6.0');
          expect(newNumOfSalary).to.be.equal(1);
          db.getJob(3, (err, res, fields) => {
            expect(res).to.have.lengthOf(1);
            expect(res[0].salary).to.be.equal('6.0');
            expect(res[0].numSalaries).to.be.equal(1);
            done();
          });
        })
      });
    });
  });

  describe('Survey', () => {

    beforeEach((done) => {
      fs.readFile('test/survey.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    afterEach((done) => {
      db.conn.query('DROP TABLE IF EXISTS completedSurveyRes', (err, res) => {
        db.conn.query('DROP TABLE IF EXISTS completedSurvey', (err, res) => {
          done();
        });
      });
    });

    describe('getAllSurveyQuestions', () => {
      it('should get 2 questions', (done) => {
        db.getAllSurveyQuestions((err, res, fields) => {
          expect(res).to.have.lengthOf(2);
          done();
        });
      });

      it('should get the correct first question', (done) => {
        db.getAllSurveyQuestions((err, res, fields) => {
          let firstQuestion = res[0];
          expect(firstQuestion.id).to.equal(1);
          expect(firstQuestion.question).to.equal('Is this a test?');
          expect(firstQuestion.questionType).to.equal('boolean');
          expect(firstQuestion.questionIndex).to.equal(1);
          expect(firstQuestion.responses).to.equal('True;False');
          done();
        });
      });
    });

    describe('getAllCompleteSurvey', () => {
      it('should get 2 completed surveys', (done) => {
        db.getAllCompleteSurvey((err, res, fields) => {
          expect(res).to.have.lengthOf(2);
          done();
        });
      });

      it('should get the correct first completed survey', (done) => {
        db.getAllCompleteSurvey((err, res, fields) => {
          let firstSurvey = res[0];
          expect(firstSurvey.id).to.equal(1);
          done();
        });
      });
    });

    describe('getCompleteSurveyRes', () => {
      it('should get the correct responses in the completed survey', (done) => {
        db.getCompleteSurveyRes(1, (err, res, fields) => {
          expect(res).to.have.lengthOf(2);
          let firstRes = res[0];
          let secondRes = res[1];

          expect(firstRes.id).to.equal(1);
          expect(firstRes.response).to.equal('True');
          expect(firstRes.questionIndex).to.equal(1);

          expect(secondRes.id).to.equal(2);
          expect(secondRes.response).to.equal('No Opinion');
          expect(secondRes.questionIndex).to.equal(2);
          done();
        });
      });

      it('should get no responses for a non existent completed survey', (done) => {
        db.getCompleteSurveyRes(1337, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });

    describe('addCompleteSurvey', () => {
      it('should add a new completed survey record', (done) => {
        db.addCompleteSurvey((err, res, fields) => { });

        db.getAllCompleteSurvey((err, res, fields) => {
          expect(res).to.have.lengthOf(3);
          let addedSurvey = res[2];

          expect(addedSurvey.id).to.equal(3);
          done();
        });
      });
    });

    describe('addCompleteSurveyRes', () => {
      it('should add a new completed survey record response', (done) => {
        db.addCompleteSurveyRes(
          2, //surveyID
          1, //questionIndex
          "False" //response
          , (err, res, fields) => { });

        db.getCompleteSurveyRes(2, (err, res, fields) => {
          expect(res).to.have.lengthOf(1);
          let addedRes = res[0];

          expect(addedRes.surveyID).to.equal(2);
          expect(addedRes.questionIndex).to.equal(1);
          expect(addedRes.response).to.equal("False");
          done();
        });
      });

      it('should not add a response for a non existent completed survey', (done) => {
        db.addCompleteSurveyRes(
          999999, //surveyID
          1, //questionIndex
          "False" //response
          , (err, res, fields) => { });

        db.getCompleteSurveyRes(999999, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });
  });

  describe('JobRating', () => {
    beforeEach((done) => {
      fs.readFile('test/job.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          fs.readFile('test/jobRating.sql', "utf8", function (err, ratData) {
            db.conn.query(ratData, (err, res) => {
              done();
            });
          });
        });
      });
    });

    afterEach((done) => {
      db.conn.query('DROP TABLE IF EXISTS jobRating', (err, res) => {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
          done();
        });
      });
    });

    it('should return the rating of job 1', (done) => {
      db.getJobRating(1, (err, res, fields) => {
        expect(res).to.have.lengthOf(1);
        expect(res[0].jobId).to.equal(1);
        expect(res[0].score).to.equal('1.00');
        expect(res[0].votes).to.equal(1);
        done();
      });
    });

    it('should not return the rating of a non-existent job', (done) => {
      db.getJobRating(10, (err, res, fields) => {
        expect(res).to.have.lengthOf(0);
        done();
      });
    });

    it('should not return the rating of a non-valid job id', (done) => {
      db.getJobRating('a', (err, res, fields) => {
        expect(res).to.have.lengthOf(0);
        done();
      });
    });

    it('should add a first rating to a job', (done) => {
      db.rateJob(
        3,  // job id
        5,  // job score
        1,  // number of votes
        (err, res, fields) => { });

      db.getJobRating(3, (err, res, fields) => {
        expect(res).to.have.lengthOf(1);
        expect(res[0].jobId).to.equal(3);
        expect(res[0].score).to.equal('5.00');
        expect(res[0].votes).to.equal(1);
        done();
      });
    });

    it('should add rating to a job that was rated before', (done) => {
      db.rateJob(
        2,  // job id
        4,  // job score
        3,  // number of votes
        (err, res, fields) => { });

      db.getJobRating(2, (err, res, fields) => {
        expect(res).to.have.lengthOf(1);
        expect(res[0].jobId).to.equal(2);
        expect(res[0].score).to.equal('4.00');
        expect(res[0].votes).to.equal(3);
        done();
      });
    });
  });

  describe('question', () => {

    beforeEach((done) => {
      fs.readFile('test/question.sql', "utf8", function (err, data) {
        db.conn.query(data, (err, res) => {
          done();
        });
      });
    });

    afterEach((done) => {
      db.conn.query('DROP TABLE IF EXISTS answers', (err, res) => {
        db.conn.query('DROP TABLE IF EXISTS question', (err, res) => {
          done();
        });
      });
    });

    describe('getAllQuestions', () => {
      it('should return all 3 questions from the database', (done) => {
        db.getAllQuestions((err, res, fields) => {
          expect(res).to.have.lengthOf(3);
          done();
        });
      });

      it('should return the questions in the correct order', (done) => {
        db.getAllQuestions((err, res, fields) => {
          let firstRecord = res[0];
          let secondRecord = res[1];
          let thirdRecord = res[2];

          expect(res).to.have.lengthOf(3);
          expect(firstRecord.id).to.equal(1);
          expect(firstRecord.title).to.equal('first test title');
          expect(secondRecord.id).to.equal(2);
          expect(secondRecord.title).to.equal('how much time to find a job?');
          expect(thirdRecord.id).to.equal(3);
          expect(thirdRecord.title).to.equal('what are you looking at?');
          done();
        });
      });
    });

    describe('addNewQuestion', () => {

      it('should successfully add a new valid question', (done) => {
        db.addNewQuestion({ title: 'new title', body: 'new body', author: 'new author' }, (err, res, fields) => {
          expect(err).to.be.null;
          done();
        });
      });

      it('should not add a new question with an invalid title', (done) => {
        db.addNewQuestion({ title: undefined, body: 'new body', author: 'new author' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a new question with an invalid body', (done) => {
        db.addNewQuestion({ title: 'new title', body: undefined, author: 'new author' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a new question with an invalid author name', (done) => {
        db.addNewQuestion({ title: 'new title', body: 'new body', author: undefined }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });
    });

    describe('getQuestionById', () => {

      it('should get the correct question by its id', (done) => {
        db.getQuestionById(1, (err, res, fields) => {
          expect(res[0].id).to.equal(1);
          expect(res[0].title).to.equal('first test title');
          expect(res[0].body).to.equal('this is the body');
          expect(res[0].author).to.equal('Dima');
          done();
        });
      });

      it('should return an empty response for an id that does not exist', (done) => {
        db.getQuestionById(999, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });

    describe('addNewAnswer', () => {

      it('should successfully add a new valid answer', (done) => {
        db.addNewAnswer(1, { body: 'new body', author: 'new author' }, (err, res, fields) => {
          expect(err).to.be.null;
          done();
        });
      });

      it('should not add a new answer with an invalid body', (done) => {
        db.addNewAnswer(1, { body: undefined, author: 'new author' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a new answer with an invalid author name', (done) => {
        db.addNewAnswer(1, { body: 'new body', author: undefined }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a new answer with an invalid question id', (done) => {
        db.addNewAnswer('a', { body: 'new body', author: 'new author' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should not add a new answer with an non-existent question id', (done) => {
        db.addNewAnswer(20, { body: 'new body', author: 'new author' }, (err, res, fields) => {
          expect(err).to.exist;
          done();
        });
      });
    });

    describe('getAnswer', () => {

      it('should get the answers for a question', (done) => {
        db.getAnswersByQuestion(2, (err, res, fields) => {
          expect(res).to.have.lengthOf(2);
          done();
        });
      });

      it('should return an empty response for a question without answers', (done) => {
        db.getAnswersByQuestion(3, (err, res, fields) => {
          expect(res).to.have.lengthOf(0);
          done();
        });
      });
    });
  });
});