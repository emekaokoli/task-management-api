import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { createUser, findUserByUsername } from '../models/user';
import { userSchema } from '../schema/request.schema';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenPrivateKey } = config;

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { username, password } = userSchema.parse(req.body);
    // check if user already exists before registering a new user
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return ResponseBuilder.failure(
        res,
        400,
        'User already exists',
        
      );
    } 
    const user = await createUser(username, password);
    const token = jwt.sign({ id: user.id }, accessTokenPrivateKey, {
      expiresIn: '1h', // token expires in 1 hour
      algorithm: 'RS256',
    });
    return ResponseBuilder.success(res, 201, { token });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error registering user',
      err.message
    );
  }
}
