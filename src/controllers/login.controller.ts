import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { config } from '../config/default';
import { userSchema } from '../schema/request.schema';
import { findUserByUsername } from '../service/user';
import { signJwt } from '../utils/jwt.util';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenTtl } = config;

export async function userLoginHandler(req: Request, res: Response) {
  try {
    const { username, password } = userSchema.parse(req.body);
    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = signJwt(
      { user: omit(user, ['password']) },
      { expiresIn: accessTokenTtl } // 1 hour
    );

    return ResponseBuilder.success(res, 200, { token });
  } catch (err: any) {
    return ResponseBuilder.failure(res, 500, 'Error logging in', err.message);
  }
}
