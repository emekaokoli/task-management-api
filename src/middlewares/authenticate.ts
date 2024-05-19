import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../service/user';
import { verifyJwt } from '../utils/jwt.util';
import { ResponseBuilder } from '../utils/responseBuilder';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return ResponseBuilder.failure(res, 403, 'You are not authorized!!!');
  }

  try {
    const { decoded } = verifyJwt(token);
    if (!decoded || !decoded.id) {
      return ResponseBuilder.failure(res, 401, 'Invalid token');
    }

    const user = await findUserById(decoded.id);
    if (!user) {
      return ResponseBuilder.failure(res, 404, 'User not found');
    }

    req.user = user;
    next();
  } catch (err: any) {
    return ResponseBuilder.failure(res, 401, 'Invalid token', err.message);
  }
};
