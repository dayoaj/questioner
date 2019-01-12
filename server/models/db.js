const questions = [];
const meetups = [];
const rsvps = [];

class obj {
  static setQuestions(data) {
    return questions.push(data);
  }

  static setMeetups(data) {
    return meetups.push(data);
  }

  static setRsvps(data) {
    return rsvps.push(data);
  }

  static getQuestions() {
    return questions;
  }

  static getMeetups() {
    return meetups;
  }

  static getRsvps() {
    return rsvps;
  }

  static refresh() {
    questions.splice(0, questions.length);
    meetups.splice(0, meetups.length);
    rsvps.splice(0, rsvps.length);
    return null;
  }
}

export default obj;
