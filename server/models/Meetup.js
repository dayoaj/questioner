import moment from 'moment';
import uuid from 'uuid';
import ErrorHandle from './ErrorHandle';
import db from './index';

class Meetup {
  /**
   *@param {req.body} data
   *
   * @returns {object} meetup object
   */
  static async create(data) {
    const id = uuid.v4();
    const newMeetup = [
      `${id}`,
      'ac8b5a0b-8fb4-473b-a2e8-ec2f61a925aa',
      moment(),
      data.location,
      null,
      data.topic,
      data.body,
      moment(data.happeningOn) || moment(),
      null,
      data.convener
    ];
    try {
      const { rows } = await db.query(
        `INSERT INTO meetups(
          id, user_id, createdon, location, images, topic, body, happeningon, tags, convener)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
        newMeetup
      );
      return {
        id: rows[0].id,
        topic: rows[0].topic,
        location: rows[0].location,
        happeningOn: rows[0].happeningon,
        tags: []
      };
    } catch (err) {
      return err;
    }
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static async findAllRSVP() {
    try {
      const { rows } = await db.query(
        `SELECT id, meetup, user_id, response
	FROM rsvps`
      );
      return rows;
    } catch (err) {
      return err;
    }
  }

  /**
   *@param {req.body} data
   *@param {UUID} id
   *
   * @returns {object} RSVP object
   */
  static async createRSVP(data, id) {
    const idRSVP = uuid.v4();
    const newRSVP = [`${idRSVP}`, id, data.user, data.status, data.topic];
    try {
      const rsvp = await this.findOneRSVP(idRSVP);
      const meetup = await this.findOne(id);

      if (meetup && rsvp.response === data.status)
        throw new ErrorHandle('Event RSVP is already stored');
      if (meetup && meetup.happeningon < moment())
        throw new ErrorHandle('Cannot Reserve, Event is past');
      const { rows } = await db.query(
        `INSERT INTO rsvps(
          id, meetup, user_id, response, topic)
          VALUES ($1, $2, $3, $4, $5) returning *`,
        newRSVP
      );
      return {
        id: rows[0].id,
        meetup: rows[0].meetup,
        topic: rows[0].topic,
        status: rows[0].response
      };
    } catch (err) {
      return err;
    }
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static async findOneRSVP(id) {
    try {
      const { rows } = await db.query(
        `SELECT id, meetup, user_id, response, topic FROM rsvps WHERE "id" = $1`,
        [id]
      );
      return rows[0];
    } catch (err) {
      return err;
    }
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} meetup object
   */
  static async findOne(id) {
    try {
      const { rows } = await db.query(
        `SELECT id, user_id, createdon, location, images, topic, body, happeningon, tags, convener
	FROM meetups WHERE "id" = $1`,
        [id]
      );
      return rows[0];
    } catch (err) {
      return err;
    }
  }

  /**
   *
   *
   * @returns {object} meetups object
   */
  static async findAll() {
    try {
      const { rows } = await db.query(
        `SELECT id, user_id, createdon, location, images, topic, body, happeningon, tags, convener
	FROM meetups`
      );
      return rows;
    } catch (err) {
      return err;
    }
  }

  static async findUpcoming() {
    try {
      const { rows } = await db.query(
        `SELECT id, user_id, createdon, location, images, topic, body, happeningon, tags, convener
	FROM meetups WHERE "happeningon" > NOW()`
      );
      return rows;
    } catch (err) {
      return err;
    }
  }
}

export default Meetup;
