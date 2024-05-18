import { User } from '@/types/User';
import { type Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: User | JwtPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: User | JwtPayload;
    }
  }
}
