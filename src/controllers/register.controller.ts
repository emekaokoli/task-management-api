import { Request, Response } from 'express';
import { isEmpty, omit } from 'lodash';
import { userSchema } from '../schema/request.schema';
import { createUser, findUserByUsername } from '../service/user';
import { ResponseBuilder } from '../utils/responseBuilder';

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { username, password } = userSchema.parse(req.body);
    // check if user already exists before registering a new user
    const checkIfExist = await findUserByUsername(username);
    if (!isEmpty(checkIfExist) && checkIfExist?.username === username) {
      return ResponseBuilder.failure(res, 400, 'User already exists');
    }
    const user = await createUser(username, password);

    const omitedUser = omit(user, ['password']);

    return ResponseBuilder.success(res, 201, { user: omitedUser });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error registering user',
      err.message
    );
  }
}
