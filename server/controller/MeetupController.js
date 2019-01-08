import Meetup from '../models/Meetup';

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
  static create(req, res) {
    if (!req.body.location || !req.body.topic || !req.body.happeningOn) {
      return res.status(400).send({
        status: 400,
        error: 'Some required parameters to create meetup are missing'
      });
    }
    const meetup = Meetup.create(req.body);

    return res.status(201).send({
      status: 201,
      data: [meetup]
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
  static createRSVP(req, res) {
    if (!req.body.topic || !req.body.status) {
      return res.status(400).send({
        status: 400,
        error: 'Some required parameters to rsvp are missing'
      });
    }
    if (!Meetup.findOne(req.params.id)) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup record does not exist'
      });
    }
    const A = req.body.status !== 'yes';
    const B = req.body.status !== 'no';
    const C = req.body.status !== 'maybe';

    if ((A && !B && !C) || (B && !A && !C) || (C && !A && !B)) {
      return res.status(400).send({
        status: 400,
        error: `status should be either, yes, no or maybe but got ${req.body.status}`
      });
    }
    let rsvp = {};
    try {
      rsvp = Meetup.createRSVP(req.body, req.params.id);
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.message
      });
    }

    return res.status(201).send({
      status: 201,
      data: [rsvp]
    });
  }

  /**
   * gets a meetup record
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static getOne(req, res) {
    const meetup = Meetup.findOne(req.params.id);
    if (!meetup) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup not found'
      });
    }
    return res.status(200).send({
      status: 200,
      data: [meetup]
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
  static getAll(req, res) {
    const meetups = Meetup.findAll();
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
  static getAllRSVP(req, res) {
    const meetups = Meetup.findAllRSVP();
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
  static getUpcoming(req, res) {
    const meetups = Meetup.findUpcoming();
    if (!meetups) {
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
