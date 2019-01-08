import { Router } from 'express';
import questions from '../controller/QuestionController';
import ValidateQuestion from '../middleware/ValidateQuestion';
import ValidateResultHandler from '../middleware/ValidationResultHandler';

const routes = Router();

routes.post(
  '/',
  ValidateQuestion.validate('creatQuestion'),
  ValidateResultHandler,
  questions.create
);
routes.get('/:id', ValidateQuestion.validate('getOne'), ValidateResultHandler, questions.getOne);
routes.get('/', questions.getAll);
routes.patch(
  '/:id/upvote',
  ValidateQuestion.validate('vote'),
  ValidateResultHandler,
  questions.upvote
);
routes.patch(
  '/:id/downvote',
  ValidateQuestion.validate('vote'),
  ValidateResultHandler,
  questions.downvote
);

export default routes;
