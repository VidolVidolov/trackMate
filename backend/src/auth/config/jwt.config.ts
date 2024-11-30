import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_ACCESS_TOKEN,
    signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
  }),
);
