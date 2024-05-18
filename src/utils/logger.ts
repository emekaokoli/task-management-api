import pino, { type Logger as PinoLogger } from 'pino';

class Logger {
  private static instance: Logger;

  private constructor(private readonly client: PinoLogger<string>) {}

  static build(client: PinoLogger<string>): Logger {
    if (this.instance === undefined) {
      this.instance = new Logger(client);
    }
    return this.instance;
  }

  error(msg: Error | string): void {
    this.client.error(msg);
  }

  info(msg: string): void {
    this.client.info(msg);
  }
}

export const logger = Logger.build(pino());
