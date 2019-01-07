import moment from 'moment';
import uuid from 'uuid';
import fs from 'fs';
import RSVPException from './ErrorHandle';

class Meetup {
  /**
   * class constructor
   * @param  {object} data
   */
  constructor() {
    this.obj = {};
  }

  /**
   *@param {req.body} data
   * @returns {object} meetup object
   */
  create(data) {
    const newMeetup = {
      id: uuid.v4(),
      createdOn: moment(),
      location: data.location || '',
      images: data.images || [],
      topic: data.topic || '',
      body: data.body || '',
      happeningOn: data.happeningOn || null,
      tags: data.tags || [],
      convener: data.convener || ''
    };
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    this.obj.meetups.push(newMeetup);
    fs.writeFileSync('app/models/db.json', JSON.stringify(this.obj), 'utf8');
    return {
      topic: newMeetup.topic,
      location: newMeetup.location,
      happeningOn: newMeetup.happeningOn,
      tags: newMeetup.tags
    };
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} question object
   */
  findOneRSVP(id) {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.rsvps.find(rsvp => rsvp.meetup === id);
  }

  /**
   *@param {req.body} data
   * @returns {object} meetup object
   */
  createRSVP(data, id) {
    const newRSVP = {
      id: uuid.v4(),
      meetup: id || null,
      topic: data.topic || '',
      response: data.status || ''
    };
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    if (this.findOneRSVP(id) && this.findOneRSVP(id).response === newRSVP.response)
      throw new RSVPException('Event RSVP is already stored');
    if (this.findOne(id) && this.findOne(id).happeningOn < moment())
      throw new RSVPException('Cannot Reserve, Event is past');
    this.obj.rsvps.push(newRSVP);
    fs.writeFileSync('app/models/db.json', JSON.stringify(this.obj), 'utf8');
    return {
      meetup: newRSVP.meetup,
      topic: newRSVP.topic,
      status: newRSVP.response
    };
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} question object
   */
  findOne(id) {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.meetups.find(meetup => meetup.id === id);
  }

  /**
   *
   *
   * @returns {object} meetups object
   */
  findAll() {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.meetups;
  }

  findUpcoming() {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.meetups.filter(n => n.happeningOn > moment());
  }
}

export default new Meetup();
