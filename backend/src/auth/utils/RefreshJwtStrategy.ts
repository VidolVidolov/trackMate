import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    @Inject('AUTH_SERVICE') private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: AuthJwtPayload) {
    const refreshToken = request
      .get('authorization')
      ?.replace('Bearer', '')
      .trim();
    const userId = payload.sub;

    if (refreshToken) {
      return this.authService.validateRefreshToken(userId, refreshToken);
    } else {
      throw new UnauthorizedException('No refresh token provided');
    }
  }
}
