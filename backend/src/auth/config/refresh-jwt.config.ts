import { JwtSignOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_TOKEN,
    expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION,
  }),
);
