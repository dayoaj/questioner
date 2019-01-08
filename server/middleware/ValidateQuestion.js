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
          body('meetup', `meetup doesn't exists `).exists(),
          body('title', `title doesn't exists`).exists(),
          body('body', `body doesn't exists`).exists()
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
