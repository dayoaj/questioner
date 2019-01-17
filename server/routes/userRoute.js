import { Router } from 'express';
import user from '../controller/UserController';
import ValidateMeetup from '../middleware/ValidateUser';

const routes = Router();

routes.post('/signup', ValidateMeetup.validate('signup'), user.signup);

export default routes;
