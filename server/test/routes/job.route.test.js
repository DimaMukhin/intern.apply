const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('job.route.js', () => {

    beforeEach(() => {
        db.conn.query('DROP TABLE IF EXISTS job', (err, res) => { });
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


});