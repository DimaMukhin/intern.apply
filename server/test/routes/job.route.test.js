require('../db-inject-helper.test');
const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../../database/db.service');

describe('job.route.js', () => {

    beforeEach(() => {
        db.conn.query('DROP TABLE job', (err, res) => { });
        db.conn.query(`CREATE TABLE job (
            id INT NOT NULL AUTO_INCREMENT,
            organization VARCHAR(45) NOT NULL,
            title VARCHAR(100) NOT NULL,
            location VARCHAR(45),
            description VARCHAR(2000),
            PRIMARY KEY (id))`
        );
        db.conn.query(`INSERT INTO job (id, organization, title, location) VALUES 
            (1, 'Facebook', 'test title', 'winnipeg'),
            (2, 'google', 'second title', 'vancouver'),
            (3, 'CityOFWinnipeg', 'third title', 'location'),
            (4, 'Microsoft', 'Software Developer', 'winnipeg'),
            (5, 'Dropbox', 'Software Engineer', 'vancouver')`);
    });

    describe('GET /job', () => {
        it('should return all the jobs with valid data', (done) => {
            request(app)
                .get('/api/job')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(5);
                    expect(res.body[2].organization).to.equal('CityOFWinnipeg');
                    expect(res.body[2].title).to.equal('third title');
                    expect(res.body[2].location).to.equal('location');
                })
                .end(done);
        });
    });

    /**
   * Gets a job based on the filter
   */
    describe('GET /job/filter', () => {
        it('should return filtered jobs based on the filter', (done) => {
            request(app)
                .get('/api/job/')
                .query({ filter: 'soft' })
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(2);
                    expect(res.body[1].organization).to.equal('Dropbox');
                    expect(res.body[1].title).to.equal('Software Engineer');
                    expect(res.body[1].location).to.equal('vancouver');
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
                    expect(res.body).to.have.lengthOf(5);
                    expect(res.body[4].organization).to.equal('Dropbox');
                    expect(res.body[4].title).to.equal('Software Engineer');
                    expect(res.body[4].location).to.equal('vancouver');
                })
                .end(done);
        });
    });

    /**
   * Gets no jobs when there are no jobs based on the filter/search query
   */
    describe('GET /job/filter', () => {
        it('should return all the jobs with empty filter', (done) => {
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


    db.conn.query(`INSERT INTO job (id, organization, title, location, description) VALUES 
            (1, 'Test Org', 'test title', '123 test st', 'test description'),
            (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test'),
            (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description'),
            (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description')`);

    describe('POST /job', () => {

        it('should create a new job as specified', (done) => {
            request(app)
                .post('/api/job')
                .send({ organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: 'Blank' })
                .expect(200)
                .expect(res => {
                    let job = res.body

                    expect(job.organization).to.equal('Test X Team');
                    expect(job.title).to.equal('Title of Test');
                    expect(job.location).to.equal('N/A');
                    expect(job.description).to.equal('Blank');
                })
                .end(done);
        });


        it('should return an error message with code 11 for invalid organization', (done) => {
            request(app)
                .post('/api/job')
                .send({ organization: '', title: 'Title of Test', location: 'N/A', description: 'Blank' })
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
                .send({ organization: 'Test X Team', title: '', location: 'N/A', description: 'Blank' })
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
                .send({ organization: 'Test X Team', title: 'Title of Test', location: '', description: 'Blank' })
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
                .send({ organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: '' })
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(1);
                    expect(err.body[0].code).to.equal(14);
                })
                .end(done);
        });

        it('should return 3 error messages with 3 different codes for 3 different invalid fields', (done) => {
            request(app)
                .post('/api/job')
                .send({ organization: '', title: '', location: '', description: '' })
                .expect(400)
                .expect(err => {
                    let errorContents = err.body;

                    expect(errorContents).to.have.lengthOf(4);
                    expect(errorContents[0].code).to.equal(11);
                    expect(errorContents[1].code).to.equal(12);
                    expect(errorContents[2].code).to.equal(13);
                    expect(errorContents[3].code).to.equal(14);
                })
                .end(done);
        });
    });

});