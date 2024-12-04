import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { User } from '@prisma/client';

type DoneCallback = (error?: Error | null, result?: User | null) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: DoneCallback) {
    done(null, user);
  }
  async deserializeUser(payload: User, done: DoneCallback) {
    const user = await this.authService.findUserById(payload.id);
    return done(null, user);
  }
}
