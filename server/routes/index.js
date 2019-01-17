import express, { Router } from 'express';
import expressValidator from 'express-validator';
import questions from './questionRoute';
import meetups from './meetupRoute';
import users from './userRoute';

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: 'true' }));
routes.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).send({
      status: 400,
      error: 'JSON is Invalid'
    });
  } else {
    next();
  }
});
routes.use(expressValidator());

routes.use('/questions', questions);
routes.use('/meetups', meetups);
routes.post('/auth', users);

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
