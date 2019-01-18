import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import Question from '../models/Question';

const { expect } = chai;
chai.use(chaiHttp);

describe('Question', () => {
  let req = {
    body: {}
  };
  beforeEach(() => {
    Question.refresh();
  });

  describe('GET /questions/', () => {
    it('it should GET all questions', done => {
      chai
        .request(server)
        .get('/api/v1/questions')
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
  describe('GET /question/:id', () => {
    it('it should GET a particular meetup', done => {
      const question = Question.create({
        createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
        meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
        title: 'Python Web Developers Meetup',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .get(`/api/v1/questions/${question.id}`)
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

  describe('GET /question/:id', () => {
    it('it should return error for non-existing question id', done => {
      Question.create({
        createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
        meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
        title: 'Python Web Developers Meetup',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .get(`/api/v1/questions/d0e62cc7-2f7d-4a8e-bfd4-b6a43b7a7c8b`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.a('string');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal(
            'Could not find question d0e62cc7-2f7d-4a8e-bfd4-b6a43b7a7c8b'
          );
          done();
        });
    });
  });

  describe('GET /questions/:id/downvote', () => {
    it('it should downvote a question', done => {
      const question = Question.create({
        createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
        meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
        title: 'Python Web Developers Meetup',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .patch(`/api/v1/questions/${question.id}/downvote`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].votes).to.equal(-1);
          done();
        });
    });
  });

  describe('GET /questions/:id/upvote', () => {
    it('it should upvote a question', done => {
      const question = Question.create({
        createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
        meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
        title: 'Python Web Developers Meetup',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .patch(`/api/v1/questions/${question.id}/upvote`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].votes).to.equal(1);
          done();
        });
    });
  });

  describe('POST /questions', () => {
    it('it should create a question record', done => {
      req = {
        body: {
          createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
          meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
          title: 'Python Web Developers Meetup',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/api/v1/questions')
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

  describe('POST /questions', () => {
    it('it should trim out excess space when creating a question record', done => {
      req = {
        body: {
          createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aee1db',
          meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
          title: '    Python Web Developers Meetup',
          body: 'True Pythonistas Meetup!    '
        }
      };
      chai
        .request(server)
        .post('/api/v1/questions')
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

  describe('POST /questions', () => {
    it('it should return error for wrong uuid entry', done => {
      req = {
        body: {
          createdBy: '833eb7b4-0f84-47b9-b1b7-e731c8aeedb',
          meetup: 'bd9305a9-2553-458e-85e3-e370857dee61',
          title: 'Python Web Developers Meetup',
          body: 'True Pythonistas Meetup!    '
        }
      };
      chai
        .request(server)
        .post('/api/v1/questions')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.an('array');
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0]).to.equal('body[createdBy]: createdBy is not UUID type');
          done();
        });
    });
  });
});
