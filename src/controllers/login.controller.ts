import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { userSchema } from '../schema/request.schema';
import { findUserByUsername } from '../service/user';
import { ResponseBuilder } from '../utils/responseBuilder';

const { accessTokenPrivateKey } = config;

export async function userLoginHandler(req: Request, res: Response) {
  try {
    const { username, password } = userSchema.parse(req.body);
    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, accessTokenPrivateKey, {
      expiresIn: '1h',
      algorithm: 'RS256',
    });
    return ResponseBuilder.success(res, 200, { token });
  } catch (err: any) {
    return ResponseBuilder.failure(res, 500, 'Error logging in', err.message);
  }
}
