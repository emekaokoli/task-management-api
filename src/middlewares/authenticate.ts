import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { findUserById } from '../models/user';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenPublicKey } = config;

interface JwtPayload {
  id: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
   return ResponseBuilder.failure(res, 403, 'You are not authorized!!!');
  }

  try {
    const decoded = jwt.verify(token, accessTokenPublicKey) as JwtPayload;
    const user = await findUserById(decoded.id);
    if (!user) {
      return ResponseBuilder.failure(res, 404, 'User not found') 
    }
    req.user = user;
    next();
  } catch (err:any) {
       return ResponseBuilder.failure(res, 401, 'Invalid token', err.message); 
  }
};
