import { Request, Response } from 'express';
import { config } from '../config/default';
import { userSchema } from '../schema/request.schema';
import { createUser, findUserByUsername } from '../service/user';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenPrivateKey } = config;

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { username, password } = userSchema.parse(req.body);
    // check if user already exists before registering a new user
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return ResponseBuilder.failure(res, 400, 'User already exists');
    }
    const user = await createUser(username, password);

    return ResponseBuilder.success(res, 201, { user });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error registering user',
      err.message
    );
  }
}
