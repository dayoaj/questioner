import Question from '../models/Question';

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} question object
 */
const QuestionController = {
  create(req, res) {
    if (!req.body.createdBy || !req.body.meetup || !req.body.title || !req.body.body) {
      return res.status(400).send({
        status: 400,
        error: 'Some required parameters are missing'
      });
    }
    const question = Question.create(req.body);

    return res.status(201).send({
      status: 201,
      data: [question]
    });
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} questions object
   */
  getAll(req, res) {
    const questions = Question.findAll();
    return res.status(200).send({
      status: 200,
      data: questions
    });
  },

  upvote(req, res) {
    const question = Question.vote(req.params.id, 'upvote');
    if (!question) {
      return res.status(404).send({
        status: 400,
        error: 'Question not found'
      });
    }
    return res.status(201).send({
      status: 201,
      data: [question]
    });
  },

  downvote(req, res) {
    const question = Question.downvote(req.params.id, 'downvote');
    if (!question) {
      return res.status(404).send({
        status: 400,
        error: 'Question not found'
      });
    }
    return res.status(201).send({
      status: 201,
      data: question
    });
  }
};

export default QuestionController;
