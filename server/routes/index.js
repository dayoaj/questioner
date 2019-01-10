import express, { Router } from 'express';
import expressValidator from 'express-validator';
import questions from './questionRoute';
import meetups from './meetupRoute';

const routes = Router();

routes.use(express.json());
routes.use(expressValidator());

routes.use('/questions', questions);
routes.use('/meetups', meetups);

routes.use('*', (req, res) => {
  res
    .status(404)
    .send({
      status: 404,
      error: 'Invalid Route'
    })
    .end();
});

export default routes;
