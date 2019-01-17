import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import Meetup from '../models/Meetup';
import { createTables, dropTables } from './configdb';

const { expect } = chai;
chai.use(chaiHttp);

describe('Meetup', () => {
  let req = {
    body: {}
  };

  beforeEach(done => {
    createTables();
    done();
  });

  describe('GET /meetups', () => {
    it('it should GET all meetups', done => {
      chai
        .request(server)
        .get('/api/v1/meetups')
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

  describe('GET /meetup/:id', () => {
    it('it should GET a particular meetup', done => {
      const meetup = Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2018-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .get(`/api/v1/meetups/${meetup.id}`)
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

  describe('GET /meetup/:id', () => {
    it('it should return an error for meetup not found', done => {
      Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2018-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .get(`/api/v1/meetups/b090a9d8-2044-41bb-b256-b8fab1da71cb`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.a('string');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('Meetup not found');
          done();
        });
    });
  });

  describe('GET /meetup/upcoming', () => {
    it('it should GET a particular meetup', done => {
      const meetup = Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2019-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .get(`/api/v1/meetups/${meetup.id}`)
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
        .post('/api/v1/meetups')
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

  describe('POST /meetups', () => {
    it('it should trim excessive space when creating meetup record', done => {
      req = {
        body: {
          location: '       CCHub, Yaba, Lagos.',
          topic: '    Python Web Developers Meetup    ',
          happeningOn: '2018-12-23T12:00:00.511Z',
          tags: ['Programming', 'Python', 'Web'],
          convener: 'James Richard   ',
          body: 'True Pythonistas Meetup!   '
        }
      };
      chai
        .request(server)
        .post('/api/v1/meetups')
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

  describe('POST /meetups', () => {
    it('it should return an error for adding same meetup details twice', done => {
      req = {
        body: {
          location: 'CCHub, Yaba, Lagos.',
          topic: 'Python Web Developers Meetup',
          happeningOn: '2019-12-23T12:00:00.511Z',
          tags: ['Programming', 'Python', 'Web'],
          convener: 'James Richard',
          body: 'True Pythonistas Meetup!'
        }
      };
      Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: 'rw',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .post('/api/v1/meetups')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.a('string');
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('Meetup record already exists!');
          done();
        });
    });
  });
  describe('POST /meetups', () => {
    it('it should return an error for wrong date format', done => {
      req = {
        body: {
          location: 'CCHub, Yaba, Lagos.',
          topic: 'Python Web Developers Meetup',
          happeningOn: '2019-12-23T183838382:000000',
          tags: ['Programming', 'Python', 'Web'],
          convener: 'James Richard',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/api/v1/meetups')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.an('array');
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0]).to.equal('body[happeningOn]: Date not currectly formated');
          done();
        });
    });
  });
  describe('POST /meetups', () => {
    it('it should return an error for tags not an array', done => {
      req = {
        body: {
          location: 'CCHub, Yaba, Lagos.',
          topic: 'Python Web Developers Meetup',
          happeningOn: '2019-12-23T12:00:00.511Z',
          tags: 'Programming',
          convener: 'James Richard',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/api/v1/meetups')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.an('array');
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0]).to.equal('body[tags]: tags is not an array');
          done();
        });
    });
  });
  describe('POST /meetups', () => {
    it('it should return an error for missing parameters', done => {
      req = {
        body: {
          tags: ['Programming', 'Python', 'Web'],
          convener: 'James Richard',
          body: 'True Pythonistas Meetup!'
        }
      };
      chai
        .request(server)
        .post('/api/v1/meetups')
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.an('array');
          expect(res.body.status).to.equal(400);
          expect(res.body.error[0]).to.equal(
            "body[location]: location doesn't exists for createMeetup"
          );
          expect(res.body.error[1]).to.equal("body[happeningOn]: happeningOn doesn't exist");
          expect(res.body.error[2]).to.equal("body[topic]: topic doesn't exists");
          done();
        });
    });
  });
  describe('POST /meetups/id/rsvps', () => {
    it('it should return error for past meetup reservations', done => {
      req = {
        body: {
          topic: 'Javascript Dev Meetup',
          status: 'yes'
        }
      };
      const meetup = Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2018-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .post(`/api/v1/meetups/${meetup.id}/rsvps`)
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.a('number');
          expect(res.body.error).to.be.a('string');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Cannot Reserve, Event is past');
          done();
        });
    });
  });

  describe('POST /meetups/id/rsvps', () => {
    it('it should rsvp for a meetup', done => {
      req = {
        body: {
          topic: 'Javascript Dev Meetup',
          status: 'yes'
        }
      };
      const meetup = Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2019-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .post(`/api/v1/meetups/${meetup.id}/rsvps`)
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].topic).to.be.a('string');
          expect(res.body.data[0].status).to.be.a('string');
          expect(res.body.data[0].status).to.equal('yes');
          done();
        });
    });
  });

  describe('POST /meetups/id/rsvps', () => {
    it('it should trim excess space in meetup rsvp', done => {
      req = {
        body: {
          topic: '                 Javascript Dev Meetup',
          status: 'yes'
        }
      };
      const meetup = Meetup.create({
        location: 'CCHub, Yaba, Lagos.',
        topic: 'Python Web Developers Meetup',
        happeningOn: '2019-12-23T12:00:00.511Z',
        tags: ['Programming', 'Python', 'Web'],
        convener: 'James Richard',
        body: 'True Pythonistas Meetup!'
      });
      chai
        .request(server)
        .post(`/api/v1/meetups/${meetup.id}/rsvps`)
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].topic).to.be.a('string');
          expect(res.body.data[0].topic).to.equal('Javascript Dev Meetup');
          expect(res.body.data[0].status).to.be.a('string');
          expect(res.body.data[0].status).to.equal('yes');
          done();
        });
    });
  });
});
