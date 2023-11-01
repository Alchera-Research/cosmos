import express, { Request, Response } from 'express';

const router = express.Router();

function sampelResponse(req: Request, res: Response) {
  res.send('user router');
}

router.use('/', sampelResponse);

export default router;
