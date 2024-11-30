import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

//TODO: is it good approach or just inserting the env variables where needed is just the exact same this?
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_ACCESS_TOKEN,
    signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
  }),
);
