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
            location VARCHAR(45) NOT NULL,
            description VARCHAR(2000) NOT NULL,
            PRIMARY KEY (id))`);
        db.conn.query(`INSERT INTO job (id, organization, title, location, description) VALUES 
            (1, 'Test Org', 'test title', '123 test st', 'test description'),
            (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test'),
            (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description'),
            (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description')`);
    });
    
    describe('POST /job', () => {

        it('should create a new job as specified', (done) => {
            request(app)
                .post('/api/job')
                .send({organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: 'Blank'})
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
                .send({organization: '', title: 'Title of Test', location: 'N/A', description: 'Blank'})
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
                .send({organization: 'Test X Team', title: '', location: 'N/A', description: 'Blank'})
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
                .send({organization: 'Test X Team', title: 'Title of Test', location: '', description: 'Blank'})
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
                .send({organization: 'Test X Team', title: 'Title of Test', location: 'N/A', description: ''})
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
                .send({organization: '', title: '', location: '', description: ''})
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