import express, { Request, Response } from 'express';
import UserController from './user.controller';

const router = express.Router();

router.route('/')
  .post(UserController.create);

router.route('/:usersId')
  .get(UserController.get);

export default router;
