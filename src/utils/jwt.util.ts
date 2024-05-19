import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from 'jsonwebtoken';
import { config } from '../config/default';
const { accessTokenPrivateKey, accessTokenPublicKey } = config;

interface DecodedToken extends JwtPayload {
  id: number;
}

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, accessTokenPrivateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (error: any) {
    throw new Error(`Error signing JWT:, ${error?.message}`);
  }
}

export function verifyJwt(token: string): {
  valid: boolean;
  expired: boolean;
  decoded: DecodedToken | null;
} {
  try {
    const decoded = jwt.verify(token, accessTokenPublicKey) as JwtPayload;
    const id = decoded.user?.id;
    if (typeof id === 'undefined') {
      throw new Error('Invalid token structure');
    }

    return {
      valid: true,
      expired: false,
      decoded: { ...decoded, id } as DecodedToken,
    };
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    } else {
      throw `JWT Error:, ${error?.message}`;
    }
  }
}
