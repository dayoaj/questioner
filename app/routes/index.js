import express, { Router } from 'express';
import questions from './QuestionRoute';
import meetups from './MeetupRoute';

export default () => {
  const routes = Router();

  routes.use(express.json());

  routes.use('/questions', questions());
  routes.use('/meetups', meetups());

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
