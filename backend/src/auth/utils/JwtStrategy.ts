import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwtConfig from '../config/jwt.config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject('AUTH_SERVICE') private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    //TODO: Should i revoke access token as well?
    const userId = payload.sub;
    return this.authService.validateJwtUser(userId);
  }
}
