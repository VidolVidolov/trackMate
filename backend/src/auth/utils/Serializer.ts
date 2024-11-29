import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: User, done: Function) {
    const user = await this.authService.findUser(payload.id);
    return done(null, user ?? null);
  }
}
