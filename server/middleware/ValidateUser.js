import { body } from 'express-validator/check';

/** Class provides validation parameter */
class ValidateUser {
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
      case 'signup':
        return [
          body('firstname', `location doesn't exists for createMeetup`)
            .exists()
            .trim()
            .escape(),
          body('lastname', `location doesn't exists for createMeetup`)
            .exists()
            .trim()
            .escape(),
          body('email', `Email is not in request`).exists(),
          body('email', `Email not in correct format`)
            .isEmail()
            .normalizeEmail(),
          body('username', `username is not in request`)
            .exists()
            .trim()
            .escape(),
          body('password', `password is not in request`).exists(),
          body('isadmin', `isadmin is not in request`).exists(),
          body('isadmin', `isadmin is not a boolean`)
            .isBoolean()
            .toBoolean()
        ];

      default:
        return body();
    }
  }
}

export default ValidateUser;
