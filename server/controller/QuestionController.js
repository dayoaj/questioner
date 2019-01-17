import Question from '../models/Question';
import ValidationResultHandler from '../middleware/ValidationResultHandler';

// /** Class representing Question controller Logic */
class QuestionController {
  /**
   * creates a question record
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async create(req, res) {
    const result = ValidationResultHandler(req);
    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }
    const question = await Question.create(req.body);
    if (!question.id) {
      return res.status(500).send({
        status: 500,
        error: 'Internal Server Error'
      });
    }

    return res.status(201).send({
      status: 201,
      data: question
    });
  }

  /**
   * gets a question record
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
    const question = Question.findOne(req.params.id);
    if (!question[0].id) {
      res.status(404).send({
        status: 404,
        error: `Could not find question ${req.params.id}`
      });
    }
    return res.status(200).send({
      status: 200,
      data: [question]
    });
  }

  /**
   * gets all question records stored
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async getAll(req, res) {
    const questions = await Question.findAll();
    return res.status(200).send({
      status: 200,
      data: questions
    });
  }

  /**
   * increase the votes of a question by one
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async upvote(req, res) {
    await QuestionController.vote(req, res, 'up');
  }

  /**
   * decrease the votes of a question by one
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async downvote(req, res) {
    await QuestionController.vote(req, res, 'down');
  }

  /**
   * increase the votes of a question by one
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static async vote(req, res, mode) {
    const result = ValidationResultHandler(req);
    if (result) {
      return res.status(400).send({ status: 400, error: result });
    }
    let question = {};
    if (mode === 'up') question = await Question.vote(req.params.id, 'upvote');
    if (mode === 'down') question = await Question.vote(req.params.id, 'downvote');
    if (!question.id) {
      return res.status(404).send({
        status: 404,
        error: 'Question not found'
      });
    }
    return res.status(201).send({
      status: 201,
      data: question
    });
  }
}

export default QuestionController;
