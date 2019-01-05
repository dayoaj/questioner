import express, { Router } from 'express';
import questions from './QuestionController';

export default () => {
  const routes = Router();

  routes.use(express.json());

  routes.post('/questions', questions.create);
  routes.get('/questions', questions.getAll);
  routes.patch('/questions/:id/upvote', questions.upvote);
  routes.patch('/questions/:id/downvote', questions.downvote);
  routes.get('/', (req, res) => {
    res.json({ message: 'In Route' });
  });

  return routes;
};
