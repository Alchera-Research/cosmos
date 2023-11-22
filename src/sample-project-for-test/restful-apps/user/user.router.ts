import express, { Request, Response } from 'express';
import UserController from './user.controller';

const router = express.Router();

router.route('/')
  .get(UserController.bulkRead)
  .post(UserController.create);

router.route('/:usersId')
  .get(UserController.read)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
