const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');
const fs = require('fs');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('job.route.js', () => {

  beforeEach((done) => {
    fs.readFile('test/job3.sql', "utf8", function (err, data) {
      db.conn.query(data, (err, res) => {
          fs.readFile('test/comment.sql', "utf8", function (err, comData) {
              db.conn.query(comData, (err, res) => {
                fs.readFile('test/jobRating.sql', "utf8", function (err, ratData) {
                  db.conn.query(ratData, (err, res) => {
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
      db.conn.query('DROP TABLE IF EXISTS jobRating', (err, res) => {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => {
          done();
        })
      });
    });
  });

  describe('GET /job', () => {
    it('should return all the jobs with valid data', (done) => {
      request(app)
      .get('/api/job')
      .expect(200)
      .expect(res => {
        let jobs = res.body;

        expect(jobs).to.have.lengthOf(4);
        expect(jobs[2].organization).to.equal('The Test Mafia');
        expect(jobs[2].title).to.equal('second title');
        expect(jobs[2].location).to.equal('456 test avenue');
        expect(jobs[2].url).to.equal('https://www.testurl3.com');
      })
      .end(done);
    })
  });

  /**
   * Gets a job based on the filter
   */
  describe('GET /job/filter', () => {
    it('should return filtered jobs based on the filter', (done) => {
      request(app)
      .get('/api/job/')
      .query({ filter: 'test' })
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(4);
        expect(res.body[3].organization).to.equal('Together We Test');
        expect(res.body[3].title).to.equal('fourth title');
        expect(res.body[3].location).to.equal('789 test blvd');
        expect(res.body[3].url).to.equal('https://www.testurl4.com');        
      })
      .end(done);
    });
  });

  /**
   * Gets all jobs when the filter is empty
   */
  describe('GET /job/filter', () => {
    it('should return all the jobs with empty filter', (done) => {
      request(app)
      .get('/api/job/')
      .query({ filter: '' })
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(4);
        expect(res.body[3].organization).to.equal('Together We Test');
        expect(res.body[3].title).to.equal('fourth title');
        expect(res.body[3].location).to.equal('789 test blvd');
        expect(res.body[3].url).to.equal('https://www.testurl4.com');
      })
      .end(done);
    });
  });

  /**
   * Gets no jobs when there are no jobs based on the filter/search query
   */
  describe('GET /job/filter', () => {
    it('should return no jobs with random query for which no job exists', (done) => {
      request(app)
      .get('/api/job/')
      .query({ filter: 'Random job' })
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(0);
      })
      .end(done);
    });
  });

  describe('POST /job', () => {

    it('should create a new job as specified', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: 'Blank', url: 'https://www.testurl.com' })
      .expect(200)
      .expect(res => {
        let job = res.body

        expect(job.organization).to.equal('Test X Team');
        expect(job.title).to.equal('Title of Test');
        expect(job.location).to.equal('N/A');
        expect(job.description).to.equal('Blank');
        expect(job.url).to.equal('https://www.testurl.com');
      })
      .end(done);
    });


    it('should return an error message with code 11 for invalid organization', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: '', title: 'Title of Test', location: 'N/A', description: 'Blank', url: 'https://www.testurl.com' })
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(11);
      })
      .end(done);
    });

    it('should return an error message with code 12 for invalid title', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: 'Test X Team', title: '', location: 'N/A', description: 'Blank', url: 'https://www.testurl.com' })
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(12);
      })
      .end(done);
    });

    it('should return an error message with code 13 for invalid location', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: 'Test X Team', title: 'Title of Test', location: '', description: 'Blank', url: 'https://www.testurl.com' })
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(13);
      })
      .end(done);
    });

    it('should return an error message with code 14 for invalid description', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: '', url: 'https://www.testurl.com' })
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(14);
      })
      .end(done);
    });
    
    it('should return an error message with code 15 for invalid job URL', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: 'Blank', url: '' })
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(15);
      })
      .end(done);
    });

    it('should return 5 error messages with 5 different codes for 5 different invalid fields', (done) => {
      request(app)
      .post('/api/job')
      .send({ organization: '', title: '', location: '', description: '', url: '' })
      .expect(400)
      .expect(err => {
        let errorContents = err.body;

        expect(errorContents).to.have.lengthOf(5);
        expect(errorContents[0].code).to.equal(11);
        expect(errorContents[1].code).to.equal(12);
        expect(errorContents[2].code).to.equal(13);
        expect(errorContents[3].code).to.equal(14);
        expect(errorContents[4].code).to.equal(15);
      })
      .end(done);
    });
  });

  describe('GET /job/:id', () => {
    it('should get one job with id 3', (done) => {
      request(app)
      .get('/api/job/3')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(1);
        let job = res.body[0];

        expect(job.id).to.equal(3);
      })
      .end(done);
    });

    it('should return an error message with code 31 for an id that is a decimal', (done) => {
      request(app)
      .get('/api/job/3.14159')
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(31);
      })
      .end(done);
    });

    it('should return an error message with code 31 for an id that is not a number', (done) => {
      request(app)
      .get('/api/job/TEST')
      .expect(400)
      .expect(err => {
        expect(err.body).to.have.lengthOf(1);
        expect(err.body[0].code).to.equal(31);
      })
      .end(done);
    });
  });

  describe('GET /job/:id/comments', () => {
    it('should get all the comments of job 1', (done) => {
      request(app)
      .get('/api/job/1/comments')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(2);
      })
      .end(done);
    });

    it('should return no comments for job 3', (done) => {
      request(app)
      .get('/api/job/3/comments')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(0);
      })
      .end(done);
    });

    it('should return no comments for an unexisting job', (done) => {
      request(app)
      .get('/api/job/997/comments')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(0);
      })
      .end(done);
    });
  });

  describe('GET /job/:id/rating', () => {
    it('should return the rating for job 1', (done) => {
      request(app)
      .get('/api/job/1/rating')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].score).to.equal('1.00');
        expect(res.body[0].votes).to.equal(1);
      })
      .end(done);
    });

    it('should not return the rating of a non-existing job', (done) => {
      request(app)
      .get('/api/job/10/rating')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(0);
      })
      .end(done);
    });

    it('should not return the rating of a non-numeric job', (done) => {
      request(app)
      .get('/api/job/a/rating')
      .expect(400)
      .expect(res => {
        expect(res.body[0].code).to.equal(31);
      })
      .end(done);
    });

    it('should not return the rating of a non-existent job', (done) => {
      request(app)
      .get('/api/job/10/rating')
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.lengthOf(0);
      })
      .end(done);
    });
  });

  describe('POST /job/:id/rating', () => {
    it('should rate job 4 for the first time', (done) => {
      request(app)
      .post('/api/job/4/rating')
      .send({ score: '5.00' })
      .expect(200)
      .expect(res => {
        expect(res.body.score).to.equal(5);
        expect(res.body.votes).to.equal(1);
      })
      .end(done);
    });

    it('should add another vote for job 1', (done) => {
      request(app)
      .post('/api/job/1/rating')
      .send({ score: '3.00' })
      .expect(200)
      .expect(res => {
        expect(res.body.score).to.equal(2);
        expect(res.body.votes).to.equal(2);
      })
      .end(done);
    });

    it('should not add rating for a non-existent job', (done) => {
      request(app)
      .post('/api/job/10/rating')
      .send({ score: '3.00' })
      .expect(400)
      .expect(res => {
        expect(res.body[0].code).to.equal(0);
      })
      .end(done);
    });

    it('should not add rating for a non-numeric job id', (done) => {
      request(app)
      .post('/api/job/a/rating')
      .send({ score: '3.00' })
      .expect(400)
      .expect(res => {
        //console.log(res.body);
        expect(res.body[0].code).to.equal(31);
      })
      .end(done);
    });

    it('should not add rating for a non-valid score', (done) => {
      request(app)
      .post('/api/job/1/rating')
      .send({ score: '8.00' })
      .expect(400)
      .expect(res => {
        expect(res.body[0].code).to.equal(32);
      })
      .end(done);
    });

    it('should not add rating for a non-numeric score', (done) => {
      request(app)
      .post('/api/job/1/rating')
      .send({ score: 'abc' })
      .expect(400)
      .expect(res => {
        expect(res.body[0].code).to.equal(32);
      })
      .end(done);
    });
  });
});