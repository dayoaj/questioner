const chai = require('chai');
const chaiHttp = require('chai-http');

const server = 'localhost:8080/api/v1';
const { expect } = chai;
chai.use(chaiHttp);

describe('Question', () => {
  let req = {
    body: {}
  };

  describe('GET /questions/', () => {
    it('it should GET all questions', done => {
      chai
        .request(server)
        .get('/questions')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /questions', () => {
    it('it should create a question record', done => {
      req = {
        body: {
          createdBy: 665556,
          meetup: 8382929,
          title: 'Python Web Developers Meetup',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/questions')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].title).to.be.a('string');
          expect(res.body.data[0].body).to.be.a('string');
          expect(res.body.status).to.equal(201);
          expect(res.body.data[0].title).to.equal('Python Web Developers Meetup');
          expect(res.body.data[0].body).to.equal('True Pythonistas Meetup!');
          done();
        });
    });
  });
});
