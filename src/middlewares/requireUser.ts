import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../../type';
import { ResponseBuilder } from '../utils/responseBuilder';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user;

  if (!user) {
    return ResponseBuilder.failure(res, 403, 'User not authenticated');
  }

  return next();
};

export default requireUser;
