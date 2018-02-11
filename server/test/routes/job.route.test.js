const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../db.connection.test');

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
    
    describe('GET /job/:id', () => {
        it('should get one job with id 3', (done) => {
            request(app)
                .get('/api/job/:3')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    let job = res.body;

                    expect(job.id).to.equal('3');
                })
                .end(done);
        });

        it('should return an error message with code 31 for an id that is a decimal', (done) => {
            request(app)
                .get('/api/job/:3.14159')
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(0);
                })
                .end(done);
        });

        it('should return an error message with code 31 for an id that is not a number', (done) => {
            request(app)
                .get('/api/job/:TEST')
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(0);
                })
                .end(done);
        });
    });
});