import moment from 'moment';
import uuid from 'uuid';
import fs from 'fs';

class Question {
  /**
   * class constructor
   * @param  {object} data
   */
  constructor() {
    this.obj = {};
  }

  /**
   *
   * @returns {object} question object
   */
  create(data) {
    const newQuestion = {
      id: uuid.v4(),
      createdOn: moment(),
      createdBy: data.createdBy || null,
      meetup: data.meetup || null,
      title: data.title || '',
      body: data.body || '',
      votes: data.votes || 0
    };
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    this.obj.questions.push(newQuestion);
    fs.writeFileSync('app/models/db.json', JSON.stringify(this.obj), 'utf8');
    return newQuestion;
  }

  vote(id, mode) {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    const question = this.findOne(id);
    const index = this.obj.questions.indexOf(question);
    const { votes } = question;
    if (votes > 0 && mode === 'upvote') this.obj.questions[index].votes = votes + 1;
    if (votes > 0 && mode === 'downvote') this.obj.questions[index].votes = votes - 1;
    fs.writeFileSync('app/models/db.json', JSON.stringify(this.obj), 'utf8');
    return this.obj.questions[index];
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} question object
   */
  findOne(id) {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.questions.find(question => question.id === id);
  }

  /**
   *
   *
   * @returns {object} questions object
   */
  findAll() {
    const obj = JSON.parse(fs.readFileSync('app/models/db.json', 'utf8'));
    this.obj = obj;
    return this.obj.questions;
  }
}

export default new Question();
