process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const app = require('../app')
chai.use(chaiHttp);

describe('/trades GET', () => {
    it('get all trades', (done) => {
        chai.request(app)
            .get('/trades')
            .end((err, res) => {
                if (err) done(err);
                res.should.have.status(200);
                done();
            });
    });
});