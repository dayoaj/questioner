import moment from 'moment';
import uuid from 'uuid';
import db from './db';
import ErrorHandle from './ErrorHandle';

class Meetup {
  /**
   *@param {req.body} data
   *
   * @returns {object} meetup object
   */
  static async create(data) {
    const newMeetup = {
      id: uuid.v4(),
      creator: data.creator || '',
      createdOn: moment(),
      location: data.location || '',
      images: data.images || [],
      topic: data.topic || '',
      body: data.body || '',
      happeningOn: moment(data.happeningOn) || null,
      tags: data.tags || [],
      convener: data.convener || ''
    };

    const text = `INSERT INTO
      meetups(id, user_id, createdon, location, images, topic, body, happeningon, tags, convener )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    const values = [
      newMeetup.id,
      newMeetup.creator,
      newMeetup.createdOn,
      newMeetup.location,
      newMeetup.images,
      newMeetup.topic,
      newMeetup.body,
      newMeetup.happeningOn,
      newMeetup.tags,
      newMeetup.convener
    ];

    try {
      const { rows } = await db.query(text, values);
      return {
        id: rows[0].id,
        topic: rows[0].topic,
        location: rows[0].location,
        happeningOn: rows[0].happeningOn,
        tags: rows[0].tags
      };
    } catch (error) {
      return error;
    }
  }

  /**
   * Should get one rsvp object
   * @param {uuid} id
   * @returns {object}  rsvp object
   */
  static async findOneRSVP(id) {
    const findOneRSVPQuery = `SELECT * FROM meetups  WHERE id = '${id}'`;
    const { row } = await db.query(findOneRSVPQuery);
    return row[0];
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static async findAllRSVP() {
    const findAllRSVPQuery = 'SELECT * FROM rsvps';
    const { rows } = await db.query(findAllRSVPQuery);
    return rows;
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

    // Check if event has occured
    if (this.findOneRSVP(id) && this.findOneRSVP(id).response === newRSVP.response)
      throw new ErrorHandle('Event RSVP is already stored');

    // Check if  event has already taken place
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
  static async findOne(id) {
    const findOneQuery = `SELECT * FROM meetups  WHERE id = '${id}'`;
    const { rows } = await db.query(findOneQuery);
    return rows[0];
  }

  /**
   *
   *
   * @returns {object} meetups object
   */
  static async findAll() {
    const findAllQuery = 'SELECT * FROM meetups';
    const { rows } = await db.query(findAllQuery);
    return rows;
  }

  static async findUpcoming() {
    try {
      const findUpcomingQuery = 'SELECT * FROM meetups  WHERE happeningOn > now()';
      const { rows } = await db.query(findUpcomingQuery);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default Meetup;
