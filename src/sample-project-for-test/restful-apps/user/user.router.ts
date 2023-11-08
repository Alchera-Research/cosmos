import express, { Request, Response } from 'express';
import UserController from './user.controller';

const router = express.Router();

function sampelResponse(req: Request, res: Response) {
  res.send('user middleware');
}

router.route('/')
  .get(sampelResponse)
  .post(UserController.create);

export default router;
