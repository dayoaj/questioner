import User from '../models/User';
import ValidationResultHandler from '../middleware/ValidationResultHandler';
import Helper from '../Helper';

/** Class representing Meetup controller Logic */
class UserController {
  /**
   * Creates a User
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} res
   */
  static async signup(req, res) {
    const result = ValidationResultHandler(req);

    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }

    const user = await User.create(req.body);

    if (!user.id) {
      return res.status(500).send({
        status: 500,
        error: 'Error retrieving Data from Database'
      });
    }
    const token = Helper.generateToken(user.id);
    return res.status(201).send({
      status: 201,
      data: [
        {
          token,
          user
        }
      ]
    });
  }
}

export default UserController;
