import { Profile, Strategy } from 'passport-google-oauth20';

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Role } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  //TODO: what is the correct way of injecting the dependencies?
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      scope: [
        process.env.GOOGLE_OAUTH_SCOPE_ONE,
        process.env.GOOGLE_OAUTH_SCOPE_TWO,
      ],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const userToValidate = {
      email: 'Unknown email',
      name: profile.displayName,
      hashedRefreshToken: '',
      role: Role.USER,
      typeOfVehicle: null,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    if (profile?.emails) {
      userToValidate.email = profile.emails[0].value;
    }

    const user = await this.authService.validateUser(userToValidate);

    return user || null;
  }
}
