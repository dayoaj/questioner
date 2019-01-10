import { Router } from 'express';
import meetups from '../controller/MeetupController';
import ValidateMeetup from '../middleware/ValidateMeetup';

const routes = Router();

routes.post('/:id/rsvps', ValidateMeetup.validate('createRSVP'), meetups.createRSVP);
routes.post('/', ValidateMeetup.validate('createMeetup'), meetups.create);
routes.get('/upcoming', meetups.getUpcoming);
routes.get('/rsvps', meetups.getAllRSVP);
routes.get('/:id', ValidateMeetup.validate('getOne'), meetups.getOne);
routes.get('/', meetups.getAll);

export default routes;
