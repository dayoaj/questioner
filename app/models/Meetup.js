import moment from 'moment';
import uuid from 'uuid';

class Meetup {
  /**
   * class constructor
   * @param  {object} data
   */
  constructor() {
    this.meetups = [];
  }

  /**
   *
   * @returns {object} meetup object
   */
  create(data) {
    const newMeetup = {
      id: uuid.v4(),
      createdOn: moment.now(),
      location: data.location || '',
      images: data.images || [],
      topic: data.topic || '',
      happeningOn: data.date || '',
      tags: data.tags || [],
      convener: data.convener || ''
    };
    this.meetups.push(newMeetup);
    return newMeetup;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  findOne(id) {
    return this.meetups.find(reflect => reflect.id === id);
  }

  findAll() {
    return this.meetups;
  }
}

export default new Meetup();
