import moment from 'moment';
import uuid from 'uuid';
import db from './index';
import Helper from '../Helper';

class Meetup {
  /**
   *@param {req.body} data
   *
   * @returns {object} meetup object
   */
  static async create(data) {
    const id = uuid.v4();
    const hashPassword = Helper.hashPassword(data.password);

    const newUser = [
      `${id}`,
      data.firstname,
      data.lastname,
      '',
      data.email,
      '',
      data.username,
      hashPassword,
      moment(),
      data.isadmin
    ];
    try {
      const { rows } = await db.query(
        `INSERT INTO users(id, firstname, lastname, othername, email, phonenumber, username, password, registered, isadmin)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
        newUser
      );
      return rows[0];
    } catch (err) {
      return err;
    }
  }
}

export default Meetup;
