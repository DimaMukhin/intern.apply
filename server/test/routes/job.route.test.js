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
        db.conn.query(`INSERT INTO job (id, organization, title, location, description) VALUES 
            (1, 'Test Org', 'test title', '123 test st', 'test description'),
            (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test'),
            (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description'),
            (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description')`);
    });

    describe('GET /job', () => {
        it('should return all the jobs with valid data', (done) => {
            request(app)
                .get('/api/job')
                .expect(200)
                .expect(res => {
                    let job = res.body;

                    expect(job).to.have.lengthOf(4);
                    expect(job[2].organization).to.equal('The Test Mafia');
                    expect(job[2].title).to.equal('second title');
                    expect(job[2].location).to.equal('456 test avenue');
                })
                .end(done);
        })
    });

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