import Question from '../models/Question';
import ValidationResultHandler from '../middleware/ValidationResultHandler';

/** Class representing Question controller Logic */
class QuestionController {
  /**
   * creates a question record
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static create(req, res) {
    ValidationResultHandler(req, res);
    const question = Question.create(req.body);

    return res.status(201).send({
      status: 201,
      data: [question]
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
  static getOne(req, res) {
    ValidationResultHandler(req, res);

    const question = Question.findOne(req.params.id);
    if (!question) {
      res.status(400).send({
        status: 400,
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
  static getAll(req, res) {
    const questions = Question.findAll();
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
  static upvote(req, res) {
    ValidationResultHandler(req, res);

    const question = Question.vote(req.params.id, 'upvote');
    if (!question) {
      return res.status(404).send({
        status: 404,
        error: 'Question not found'
      });
    }
    return res.status(201).send({
      status: 201,
      data: [question]
    });
  }

  /**
   * decrease the votes of a question by one
   *
   * @param {object} req - represent request object
   * @param {object} res - represent response object
   *
   * @returns {object} return response object with appended data
   */
  static downvote(req, res) {
    ValidationResultHandler(req, res);

    const question = Question.vote(req.params.id, 'downvote');
    if (!question) {
      return res.status(404).send({
        status: 404,
        error: 'Question not found'
      });
    }
    return res.status(201).send({
      status: 201,
      data: [question]
    });
  }
}

export default QuestionController;
