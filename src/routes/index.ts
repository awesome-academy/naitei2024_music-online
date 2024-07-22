/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { UserController } from '@src/controllers/user.controller';
import { Router, Request, Response } from 'express';
import validateRequest from '@src/middleware/validate-request.middleware';
import { RegisterDto } from '@src/DTO/user/register';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'Home Page',
    message: 'Hello, welcome to the home page!',
    pageTitle: 'Home page',
  });
});
router.get('/register', UserController.getRegister);
router.post(
  '/register',
  validateRequest(RegisterDto),
  UserController.postRegister
);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);
router.get('/logout', UserController.logout);

router.get('/error', (req, res) => {
  res.render('error', { title: req.t('error.title') });
});
export default router;
