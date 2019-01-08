const chai = require('chai');
const chaiHttp = require('chai-http');

const server = 'localhost:8080/api/v1';
const { expect } = chai;
chai.use(chaiHttp);

describe('Meetup', () => {
  let req = {
    body: {}
  };

  describe('GET /meetups', () => {
    it('it should GET all meetups', done => {
      chai
        .request(server)
        .get('/meetups')
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

  describe('POST /meetups', () => {
    it('it should create a meetup record', done => {
      req = {
        body: {
          location: 'CCHub, Yaba, Lagos.',
          topic: 'Python Web Developers Meetup',
          happeningOn: '2018-12-23T12:00:00.511Z',
          tags: ['Programming', 'Python', 'Web'],
          convener: 'James Richard',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/meetups')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].topic).to.be.a('string');
          expect(res.body.data[0].happeningOn).to.be.a('string');
          expect(res.body.data[0].tags).to.be.an('array');
          expect(res.body.status).to.equal(201);
          expect(res.body.data[0].topic).to.equal('Python Web Developers Meetup');
          expect(res.body.data[0].happeningOn).to.equal('2018-12-23T12:00:00.511Z');
          done();
        });
    });
  });
});
