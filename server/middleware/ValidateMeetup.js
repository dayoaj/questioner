import { body, param } from 'express-validator/check';

/** Class provides validation parameter */
class ValidateMeetup {
  /**
   * Validate request for creating Meetup Record
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {array} body argument
   */
  static validate(method) {
    switch (method) {
      case 'createMeetup':
        return [
          body('location', `location doesn't exists for creatmeetup`).exists(),
          body('happeningOn', `happeningOn doesn't exists `).exists(),
          body('topic', `topic doesn't exists`).exists()
        ];
      case 'createRSVP':
        return [
          body('topic', `topic doesn't exists`).exists(),
          body('status', `status does not exist`).exists(),
          body('status', `status is not well formated`).isIn(['yes', 'no', 'maybe'])
        ];
      case 'getOne':
        return [param('id', `id is not uuid type`).isUUID()];

      default:
        return body();
    }
  }
}

export default ValidateMeetup;
