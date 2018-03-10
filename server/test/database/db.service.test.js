const expect = require('chai').expect;
const mysql = require('mysql2');

const db = require('../db.connection.test');


describe('db.service.js', () => {

  describe('ContactMessage', () => {

    beforeEach((done) => {
      db.conn.query('DROP TABLE IF EXISTS contactMessage', (err, res) => {
        db.conn.query(`CREATE TABLE contactMessage (
                    id INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(45) NOT NULL,
                    title VARCHAR(45) NOT NULL,
                    message VARCHAR(300) NOT NULL,
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO contactMessage (id, email, title, message) VALUES 
                        (1, 'dima@gmail.com', 'test title', 'test body'),
                        (2, 'ben@gmail.com', 'second title', 'second body'),
                        (3, 'what@is.this', 'third title', 'third body')`
              , (err, res) => {
                done();
              });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
                    (1, 'Facebook', 'test title', 'winnipeg'),
                    (2, 'google', 'second title', 'vancouver'),
                    (3, 'CityOFWinnipeg', 'third title', 'location')`
              , (err, res) => {
                done();
              });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    PRIMARY KEY (id))`,
          (err, res) => {

            db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
                        (1, 'Facebook', 'Software Engineer', 'winnipeg'),
                        (2, 'google', 'Software Developer', 'vancouver'),
                        (3, 'CityOFWinnipeg', 'Junior Dev', 'location'),
                        (4, 'CityOFWinnipeg', 'Soft Dev', 'location')`,
              (err, res) => {
                done();
              });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45) NOT NULL,
                    description VARCHAR(2000) NOT NULL,
                    url VARCHAR(1000) NOT NULL,
                    PRIMARY KEY (id))`,
          (err, res) => {
            db.conn.query(`INSERT INTO job (id, organization, title, location, description, url) VALUES 
                        (1, 'Test Org', 'test title', '123 test st', 'test description', 'https://www.testurl1.com'),
                        (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test', 'https://www.testurl2.com'),
                        (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description', 'https://www.testurl3.com'),
                        (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description', 'https://www.testurl4.com')`,
              (err, res) => {
                done();
              });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res, fields) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    PRIMARY KEY (id))`,
          (err, res) => {
            db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
                        (1, 'Facebook', 'test title', 'winnipeg'),
                        (2, 'google', 'second title', 'vancouver'),
                        (3, 'CityOFWinnipeg', 'third title', 'location')`,
              (err, res) => {
                db.conn.query('DROP TABLE IF EXISTS comment', (err, res) => {
                  db.conn.query(`CREATE TABLE comment (
                                id INT NOT NULL AUTO_INCREMENT,
                                jobID INT NOT NULL,
                                message VARCHAR(300) NOT NULL,
                                author VARCHAR(45) NOT NULL,
                                ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                PRIMARY KEY (id),
                                FOREIGN KEY (jobID) REFERENCES job (id))`,
                    (err, res) => {
                      db.conn.query(`INSERT INTO comment (id, jobID, message, author) VALUES 
                                    (1, 1, 'this is a nice comment body', 'dima'),
                                    (2, 1, 'another comment for the same job', 'ben'),
                                    (3, 2, 'this last comment is for job 2', 'rick')`,
                        (err, res) => {
                          done();
                        });
                    });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    salary DECIMAL(4,1),
                    numSalaries INT(10),
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO job (id, organization, title, location, salary, numSalaries) VALUES 
                    (1, 'Facebook', 'test title', 'winnipeg', 4, 1),
                    (2, 'google', 'second title', 'vancouver', 3, 2),
                    (3, 'CityOFWinnipeg', 'third title', 'location', 0, 0)`
              , (err, res) => {
                done();
              });
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
      db.conn.query('DROP TABLE surveyQuestion', (err, res) => {
        db.conn.query(`CREATE TABLE surveyQuestion (
                    id INT NOT NULL AUTO_INCREMENT,
                    question VARCHAR(300) NOT NULL,
                    questionType VARCHAR(300) NOT NULL,
                    questionIndex INT NOT NULL,
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO surveyQuestion (id, question, questionType, questionIndex) VALUES 
                        (1, 'Is this a test?', 'boolean', 1),
                        (2, '?', 'scale', 2)`
              , (err, res) => { });
          });
      });

      db.conn.query('DROP TABLE surveyResponse', (err, res) => {
        db.conn.query(`CREATE TABLE surveyResponse (
                    id INT NOT NULL AUTO_INCREMENT,
                    response VARCHAR(300) NOT NULL,
                    questionType VARCHAR(300) NOT NULL,
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO surveyResponse (id, response, questionType) VALUES 
                        (1, 'True', 'boolean'),
                        (2, 'False', 'boolean'),

                        (3, 'Disagree', 'scale'),
                        (4, 'No Opinion', 'scale'),
                        (5, 'Agree', 'scale')`
              , (err, res) => { });
          });
      });

      db.conn.query('DROP TABLE completedSurvey', (err, res) => {
        db.conn.query(`CREATE TABLE completedSurvey (
                        id INT NOT NULL AUTO_INCREMENT,
                        completionTime date NOT NULL,
                        PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO completedSurvey (id, completionTime) VALUES 
                            (1, '2018-02-24'),
                            (2, '1100-01-01')`
              , (err, res) => {
                db.conn.query('DROP TABLE completedSurveyRes', (err, res) => {
                  db.conn.query(`CREATE TABLE completedSurveyRes (
                                    id INT NOT NULL AUTO_INCREMENT,
                                    surveyID INT NOT NULL,
                                    response VARCHAR(300) NOT NULL,
                                    questionIndex INT NOT NULL,
                                    PRIMARY KEY (id),
                                    INDEX (surveyID),
                                    FOREIGN KEY (surveyID) REFERENCES completedSurvey(id) ON DELETE CASCADE)`
                    , (err, res) => {
                      db.conn.query(`INSERT INTO completedSurveyRes (id, surveyID, response, questionIndex) VALUES 
                                        (1, 1, 'True', 1),
                                        (2, 1, 'No Opinion', 2)`
                        , (err, res) => {
                          done();
                        });
                    });
                });
              });
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
      db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
        db.conn.query(`CREATE TABLE job (
                    id INT NOT NULL AUTO_INCREMENT,
                    organization VARCHAR(45) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    location VARCHAR(45),
                    description VARCHAR(2000),
                    salary DECIMAL(4,1),
                    numSalaries INT(10),
                    PRIMARY KEY (id))`
          , (err, res) => {
            db.conn.query(`INSERT INTO job (id, organization, title, location, salary, numSalaries) VALUES 
                    (1, 'Facebook', 'test title', 'winnipeg', 4, 1),
                    (2, 'google', 'second title', 'vancouver', 3, 2),
                    (3, 'CityOFWinnipeg', 'third title', 'location', 0, 0)`
              , (err, res) => {
                db.conn.query('DROP TABLE IF EXISTS jobRating', (err, res) => {
                  db.conn.query(`CREATE TABLE jobRating (
                              jobId INT(11) NOT NULL,
                              score DECIMAL(3,2) DEFAULT '0.00' NOT NULL,
                              votes INT(11) DEFAULT '0' NOT NULL,
                              PRIMARY KEY(jobId),
                              CONSTRAINT jobId___fk FOREIGN KEY (jobId) REFERENCES job (id) ON DELETE CASCADE )`,
                    (err, res) => {
                      db.conn.query(`INSERT INTO jobRating(jobId, score, votes) VALUES 
                              (1, 1.0, 1),
                              (2, 2.0, 2)`, (err, res) => {
                          done();
                        });
                    });
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
});