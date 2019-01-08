import { Router } from 'express';
import meetups from '../controller/MeetupController';

export default () => {
  const routes = Router();

  routes.post('/:id/rsvps', meetups.createRSVP);
  routes.post('/', meetups.create);
  routes.get('/upcoming', meetups.getUpcoming);
  routes.get('/rsvps', meetups.getAllRSVP);
  routes.get('/:id', meetups.getOne);
  routes.get('/', meetups.getAll);

  return routes;
};
