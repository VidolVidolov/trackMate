import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    //TODO: Should i revoke access token as well?
    return { id: payload.sub };
  }
}
