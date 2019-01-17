import Meetup from '../models/Meetup';
import ValidationResultHandler from '../middleware/ValidationResultHandler';

/** Class representing Meetup controller Logic */
class MeetupController {
  /**
   * Creates a Meetup Record
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} res
   */
  static async create(req, res) {
    const result = ValidationResultHandler(req);

    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }

    const meetup = await Meetup.create(req.body);

    if (!meetup.id) {
      return res.status(500).send({
        status: 500,
        error: 'Error retrieving Data from Database'
      });
    }
    return res.status(201).send({
      status: 201,
      data: meetup
    });
  }

  /**
   * RSVP for a meetup
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} res
   */
  static async createRSVP(req, res) {
    const result = ValidationResultHandler(req);

    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }
    const meetup = await Meetup.findOne(req.params.id);
    if (!meetup.id) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup record does not exist'
      });
    }
    let rsvp = {};
    try {
      rsvp = await Meetup.createRSVP(req.body, req.params.id);
      return res.status(201).send({
        status: 201,
        data: rsvp
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.message
      });
    }
  }

  /**
   * gets a meetup record
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async getOne(req, res) {
    const result = ValidationResultHandler(req);

    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }
    const meetup = await Meetup.findOne(req.params.id);
    if (!meetup.id) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup not found'
      });
    }
    return res.status(200).send({
      status: 200,
      data: meetup
    });
  }

  /**
   * gets all meetup records stored
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async getAll(req, res) {
    const meetups = await Meetup.findAll();
    return res.status(200).send({
      status: 200,
      data: meetups
    });
  }

  /**
   * Gets all RSVP for a meetup
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async getAllRSVP(req, res) {
    const meetups = await Meetup.findAllRSVP();
    return res.status(200).send({
      status: 200,
      data: meetups
    });
  }

  /**
   * Gets upcoming meetups
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async getUpcoming(req, res) {
    const meetups = await Meetup.findUpcoming();
    if (!meetups[0].id) {
      return res.status(404).send({
        status: 404,
        error: 'No Upcoming meetup'
      });
    }
    return res.status(200).send({
      status: 200,
      data: meetups
    });
  }
}

export default MeetupController;
