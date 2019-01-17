import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { createTables, dropTables } from './configdb';

const { expect } = chai;
chai.use(chaiHttp);

describe('General', () => {
  beforeEach(done => {
    createTables();
    done();
  });

  afterEach(done => {
    dropTables();
    done();
  });

  describe('GET /', () => {
    it('it should direct to app default get page', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('string');
          done();
        });
    });
  });

  describe('GET /api/v1/question', () => {
    it('it should return an error for invalid route', done => {
      chai
        .request(server)
        .get('/api/v1/question')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.an('string');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('Invalid Route');
          done();
        });
    });
  });
});
