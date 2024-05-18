import { Request, Response, Router } from 'express';
import { router as authRouter } from './auth.routes';
import { router as taskRouter } from './task.routes';

const router = Router();
router.get('/healthcheck', (_: Request, res: Response) => {
  res.sendStatus(200);
});
router.use('/tasks', taskRouter);
router.use('/', authRouter);

export { router };

