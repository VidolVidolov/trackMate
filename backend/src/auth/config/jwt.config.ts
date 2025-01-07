import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

//nestjs config service validation - env validation
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_ACCESS_TOKEN,
    signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
  }),
);
