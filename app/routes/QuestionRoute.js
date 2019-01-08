import { Router } from 'express';
import questions from '../controller/QuestionController';

export default () => {
  const routes = Router();

  routes.post('/', questions.create);
  routes.get('/:id', questions.getOne);
  routes.get('/', questions.getAll);
  routes.patch('/:id/upvote', questions.upvote);
  routes.patch('/:id/downvote', questions.downvote);

  return routes;
};
