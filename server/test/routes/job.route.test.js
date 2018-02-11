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
            (3, 'CityOFWinnipeg', 'third title', 'location')`);
    });

    describe('GET /job', () => {
        it('should return all the jobs with valid data', (done) => {
            request(app)
                .get('/api/job')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                    expect(res.body[2].organization).to.equal('CityOFWinnipeg');
                    expect(res.body[2].title).to.equal('third title');
                    expect(res.body[2].location).to.equal('location');
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
});