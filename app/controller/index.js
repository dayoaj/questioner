import express, { Router } from 'express';
import questions from './QuestionController';
import meetups from './MeetupController';

export default () => {
  const routes = Router();

  routes.use(express.json());
  // Question routes
  routes.post('/questions', questions.create);
  routes.get('/questions', questions.getAll);
  routes.patch('/questions/:id/upvote', questions.upvote);
  routes.patch('/questions/:id/downvote', questions.downvote);

  // Meetup routes
  routes.post('/meetups/:id/rsvps', meetups.createRSVP);
  routes.post('/meetups', meetups.create);
  routes.get('/meetups/upcoming', meetups.getUpcoming);
  routes.get('/meetups/:id', meetups.getOne);
  routes.get('/meetups', meetups.getAll);

  routes.use('*', (req, res) => {
    res
      .status(404)
      .send({
        status: 404,
        error: 'Invalid Route'
      })
      .end();
  });

  return routes;
};
