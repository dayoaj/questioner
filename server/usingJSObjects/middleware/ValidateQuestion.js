import { body, param } from 'express-validator/check';

/** Class provides validation parameter */
class ValidateQuestion {
  /**
   * Validate request for creating Question Record
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {array} body argument
   */
  static validate(method) {
    switch (method) {
      case 'createQuestion':
        return [
          body('createdBy', `createdBy doesn't exists`).exists(),
          body('createdBy', `createdBy is not UUID type`).isUUID(),
          body('meetup', `meetup doesn't exists `)
            .exists()
            .trim()
            .escape(),
          body('meetup', `meetup is not UUID type `).isUUID(),
          body('title', `title doesn't exists`)
            .exists()
            .trim()
            .escape(),
          body('body', `body doesn't exists`)
            .exists()
            .trim()
            .escape()
        ];
      case 'vote':
        return [param('id', `id is not uuid type`).isUUID()];
      case 'getOne':
        return [param('id', `id is not uuid type`).isUUID()];

      default:
        return body();
    }
  }
}

export default ValidateQuestion;
