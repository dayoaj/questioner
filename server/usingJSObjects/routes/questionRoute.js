import { Router } from 'express';
import questions from '../controller/QuestionController';
import ValidateQuestion from '../middleware/ValidateQuestion';

const routes = Router();

routes.post('/', ValidateQuestion.validate('createQuestion'), questions.create);
routes.get('/:id', ValidateQuestion.validate('getOne'), questions.getOne);
routes.get('/', questions.getAll);
routes.patch('/:id/upvote', ValidateQuestion.validate('vote'), questions.upvote);
routes.patch('/:id/downvote', ValidateQuestion.validate('vote'), questions.downvote);

export default routes;
