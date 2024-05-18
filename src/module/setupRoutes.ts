import { Response, type Application } from 'express';
import { router as AppRoutes } from '../routes';
import { ResponseBuilder } from '../utils/responseBuilder';

export const setUpRoutes = (app: Application) => {
  app.get('/healthcheck', (_, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/api', AppRoutes);

  app.use('*', (_, res) => {
    ResponseBuilder.failure(res, 404, 'It seems you are lost 😉', [
      'Route does not exit',
    ]);
  });
};
