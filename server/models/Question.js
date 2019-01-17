import moment from 'moment';
import uuid from 'uuid';
import db from './index';

class Question {
  /**
   *
   * @returns {object} question object
   */
  static async create(data) {
    const id = uuid.v4();
    const newQuestion = [`${id}`, moment(), data.createdBy, data.meetup, data.title, data.body, 0];
    try {
      const { rows } = await db.query(
        `INSERT INTO public.questions(
	id, createdon, createdby, meetup, title, body, votes)
	VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`,
        newQuestion
      );
      return {
        id: rows[0].id,
        user: rows[0].createdBy,
        meetup: rows[0].meetup,
        title: rows[0].title,
        body: rows[0].body,
        votes: rows[0].votes
      };
    } catch (err) {
      return err;
    }
  }

  /**
   * method handles upvote and downvote
   * @param {uuid} id
   *
   * @returns {object} question object
   */
  static async vote(id, mode) {
    try {
      if (mode === 'upvote') {
        const { rows } = await db.query(
          `UPDATE questions
	SET votes = votes + 1
	WHERE id = $1 returning *`,
          [id]
        );
        return rows[0];
      }

      if (mode === 'downvote') {
        const { rows } = await db.query(
          `UPDATE questions
	SET votes = votes - 1
	WHERE id = $1 returning *`,
          [id]
        );
        return rows[0];
      }
      return null;
    } catch (err) {
      return err;
    }
  }

  /**
   * returns one question
   * @param {uuid} id
   *
   * @returns {object} question object
   */
  static async findOne(id) {
    try {
      const { rows } = await db.query(
        `SELECT id, createdon, createdby, meetup, title, body, votes
	FROM questions WHERE id = $1`,
        id
      );
      return rows[0];
    } catch (err) {
      return err;
    }
  }

  /**
   *
   *
   * @returns {array} All questions in an array
   */
  static async findAll() {
    try {
      const { rows } = await db.query(
        `SELECT id, createdon, createdby, meetup, title, body, votes
	FROM questions`
      );
      return rows;
    } catch (err) {
      return err;
    }
  }
}

export default Question;
