import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Auth' }; //TODO: What to do with this now?
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    //TODO: Redirect to the frontendApp
    return { msg: 'Auth OK' };
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
