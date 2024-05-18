import { type Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ResponseBuilder {
  static success<T>(res: Response, statusCode: number, data: T, metadata?: unknown): void {
    res.status(statusCode).json({
      data,
      metadata
    });
  }

  static failure (res: Response, statusCode: number, message: string, issues?: string[]): void {
    res.status(statusCode).json({
      message,
      issues
    });
  }
}
