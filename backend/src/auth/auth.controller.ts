import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'Auth OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Atuthenticated' };
    }
  }
}
