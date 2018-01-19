const request = require('supertest');

const app = require('../../server');

describe('api.js', () => {

    describe('GET /api', () => {

        it('should return the status of the server', (done) => {
            request(app)
                .get('/api')
                .expect(200)
                .expect('ok')
                .end(done);
        });
        
    });
    
});