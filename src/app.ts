import cors from 'cors';
import express, { Application, json, urlencoded } from "express";
import { Server as HttpServer } from 'http';
import pino from 'pino-http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/errorHandler';
import { openAPIValidatorErrorMiddleware } from './middlewares/openApiValidatorError';
import { setUpRoutes } from './module/setupRoutes';
import { swaggerSpec } from "./swagger";
import { createTables } from './utils/init-db';
import { logger } from './utils/logger';

// io instance
let io: Server;

export const createApp = (server: HttpServer): Application => {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(pino());
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(openAPIValidatorErrorMiddleware());
  app.use(errorHandler());
  setUpRoutes(app);
  
  // socket.io
  io = new Server(server);

  // initialize the database
  createTables()
    .then(() => logger.info('Tables created'))
    .catch((err) => logger.error(`Error creating tables ${err}`));
  // .finally(() => pool.end());
  return app;
};

export { io };
