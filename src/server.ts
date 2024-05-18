// server.ts
import dotenv from 'dotenv';
import http from 'http';
import { createApp } from './app';
import { logger } from './utils/logger';

dotenv.config();

const port = process.env.PORT || 1487;

// HTTP server
const server = http.createServer((req, res) => {
  const app = createApp(server);
  app(req, res);
});

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at:', ${promise}, 'reason:', ${reason}`);
  process.exit(1);
});
