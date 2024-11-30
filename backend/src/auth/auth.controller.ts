import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { GoogleAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from 'src/consts/moduleNames';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Auth' }; //TODO: What to do with this now?
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    if (!request.user) {
      throw new UnauthorizedException();
    }

    //TODO: Find a way to fix it
    //@ts-ignore
    const userId = request.user.id;

    const jwdAccessToken = this.authService.generateAccessToken(userId);
    //TODO: Generate refresh tokens

    //TODO: Redirect to the frontendApp
    response
      .status(200)
      .json({ userInfo: request.user, token: jwdAccessToken });
  }

  @Get('user/status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Atuthenticated' };
    }
  }
}
