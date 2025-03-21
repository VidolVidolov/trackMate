import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { RequestWithUser } from './types/RequestWithUser';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthService,
    private userService: UserService,
    private config: ConfigService,
  ) {}

  @Get('/google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Successful login' };
  }

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    if (!request.user) {
      throw new UnauthorizedException();
    }

    const userId = request.user.id;

    await this.userService.updateUserLastLoginTime(userId);

    const { accessToken, refreshToken } =
      await this.authService.getTokens(userId);
    response
      .status(200)
      .redirect(
        `${this.config.get('FRONT_END_LINK')}?token=${accessToken}&refresh=${refreshToken}`,
      );
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Req() request: RequestWithUser) {
    if (!request.user) {
      throw new UnauthorizedException();
    }

    return this.authService.refreshAccessToken(request.user.id);
  }

  @Get('user/status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Atuthenticated' };
    }
  }

  @Post('signout')
  signOut(@Req() request: RequestWithUser) {
    const userId = request.user.id;
    this.authService.signOut(userId);
  }
}
