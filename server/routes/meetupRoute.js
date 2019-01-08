import { Router } from 'express';
import meetups from '../controller/MeetupController';
import ValidateMeetup from '../middleware/ValidateMeetup';
import ValidateResultHandler from '../middleware/ValidationResultHandler';

const routes = Router();

routes.post(
  '/:id/rsvps',
  ValidateMeetup.validate('creatRSVP'),
  ValidateResultHandler,
  meetups.createRSVP
);
routes.post('/', ValidateMeetup.validate('createMeetup'), ValidateResultHandler, meetups.create);
routes.get('/upcoming', meetups.getUpcoming);
routes.get('/rsvps', meetups.getAllRSVP);
routes.get('/:id', ValidateMeetup.validate('getOne'), ValidateResultHandler, meetups.getOne);
routes.get('/', meetups.getAll);

export default routes;
