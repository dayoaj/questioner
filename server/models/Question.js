import moment from 'moment';
import uuid from 'uuid';
import obj from './db';

class Question {
  /**
   *
   * @returns {object} question object
   */
  static create(data) {
    const newQuestion = {
      id: uuid.v4(),
      createdOn: moment(),
      createdBy: data.createdBy || null,
      meetup: data.meetup || null,
      title: data.title || '',
      body: data.body || '',
      votes: data.votes || 0
    };
    obj.setQuestions(newQuestion);
    return {
      id: newQuestion.id,
      user: newQuestion.createdBy,
      meetup: newQuestion.meetup,
      title: newQuestion.title,
      body: newQuestion.body,
      votes: newQuestion.vote
    };
  }

  static vote(id, mode) {
    const questions = obj.getQuestions();
    const question = questions.find(n => n.id === id);
    const index = questions.indexOf(question);
    const { votes } = question;
    if (mode === 'upvote') questions[index].votes = votes + 1;
    if (mode === 'downvote') questions[index].votes = votes - 1;
    obj.setQuestions(questions);
    return questions[index];
  }

  /**
   *
   * @param {uuid} id
   *
   * @returns {object} question object
   */
  static findOne(id) {
    const questions = obj.getQuestions();
    return questions.find(question => question.id === id);
  }

  /**
   * Drop Database
   *
   * @param {uuid} id
   *
   * @returns {object}  rsvp object
   */
  static refresh() {
    return obj.refresh();
  }

  /**
   *
   *
   * @returns {array} All questions in an array
   */
  static findAll() {
    return obj.getQuestions();
  }
}

export default Question;
