import { body, param } from 'express-validator/check';
import moment from 'moment';

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
          body('location', `location doesn't exists for createMeetup`)
            .exists()
            .trim()
            .escape(),
          body('happeningOn')
            .exists()
            .withMessage(`happeningOn doesn't exist`)
            .custom(value => {
              if (!moment(value).isValid()) {
                throw new Error('Date not currectly formated');
              }
              return true;
            }),
          body('topic', `topic doesn't exists`).exists(),
          body('topic', `topic doesn't exists`)
            .trim()
            .escape(),
          body('body')
            .trim()
            .escape(),
          body('tags').custom(value => {
            if (!Array.isArray(value)) {
              throw new Error('tags is not an array');
            }
            return true;
          }),
          body('convener')
            .trim()
            .escape()
        ];
      case 'createRSVP':
        return [
          body('topic', `topic doesn't exists`)
            .exists()
            .trim()
            .escape(),
          body('user', `user_id is not present`).exists(),
          body('user', `user_id is not a UUID type`).isUUID(),
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
