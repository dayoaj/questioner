import moment from 'moment';
import uuid from 'uuid';
import ErrorHandle from './ErrorHandle';
import obj from './db';

class Meetup {
  /**
   *@param {req.body} data
   *
   * @returns {object} meetup object
   */
  static create(data) {
    const newMeetup = {
      id: uuid.v4(),
      createdOn: moment(),
      location: data.location || '',
      images: data.images || [],
      topic: data.topic || '',
      body: data.body || '',
      happeningOn: moment(data.happeningOn) || null,
      tags: data.tags || [],
      convener: data.convener || ''
    };
    obj.setMeetups(newMeetup);
    return {
      id: newMeetup.id,
      topic: newMeetup.topic,
      location: newMeetup.location,
      happeningOn: newMeetup.happeningOn,
      tags: newMeetup.tags
    };
  }

  /**
   * Should gget one rsvp object
   * @param {uuid} id
   * @returns {object}  rsvp object
   */
  static findOneRSVP(id) {
    const rsvps = obj.getRsvps();
    return rsvps.find(rsvp => rsvp.meetup === id);
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static findAllRSVP() {
    const rsvps = obj.getRsvps();
    return rsvps;
  }

  /**
   *@param {req.body} data
   * @returns {object} meetup object
   */
  static createRSVP(data, id) {
    const newRSVP = {
      id: uuid.v4(),
      meetup: id || null,
      topic: data.topic || '',
      response: data.status || ''
    };
    if (this.findOneRSVP(id) && this.findOneRSVP(id).response === newRSVP.response)
      throw new ErrorHandle('Event RSVP is already stored');
    if (this.findOne(id) && this.findOne(id).happeningOn < moment())
      throw new ErrorHandle('Cannot Reserve, Event is past');
    obj.setRsvps(newRSVP);
    return {
      meetup: newRSVP.meetup,
      topic: newRSVP.topic,
      status: newRSVP.response
    };
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static findOne(id) {
    const meetups = obj.getMeetups();
    return meetups.find(meetup => meetup.id === id);
  }

  /**
   *Check if meetup Exists
   *
   * @param {uuid} id
   * @returns {object}  rsvp object
   */
  static exists(text) {
    const meetups = obj.getMeetups();
    return meetups.find(meetup => meetup.topic === text);
  }

  /**
   * Drop Database
   *
   * @param {uuid} id
   *
   * @returns {object}  rsvp object
   */
  static refresh() {
    return obj.refresh();
  }

  /**
   *
   *
   * @returns {object} meetups object
   */
  static findAll() {
    const meetups = obj.getMeetups();
    return meetups;
  }

  static findUpcoming() {
    const meetups = obj.getMeetups();
    return meetups.filter(n => n.happeningOn > moment());
  }
}

export default Meetup;
