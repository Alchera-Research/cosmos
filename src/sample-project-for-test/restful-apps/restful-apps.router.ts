import express from 'express';
import userRouter from './user/user.router';
import e from 'express';

const router = express.Router();

router.use('/users', userRouter);

export default router;
