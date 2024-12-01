import { AuthJwtPayload } from './types/auth-jwtPayload';
import { AuthRepository } from './auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}
  async validateUser(userDetails: Omit<User, 'id'>) {
    const user = await this.authRepository.findUserByEmail(userDetails.email);

    if (user) return user;

    //TODO: what is the better variant  - allocate memory for new variable as its more descriptive or directly return what is returned from the repository?
    const newUser =
      await this.authRepository.createUserFromGoogleAuth(userDetails);
    return newUser;
  }

  async findUserById(id: number) {
    const user = this.authRepository.findUserById(id);
    return user;
  }

  generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return { accessToken, refreshToken };
  }

  refreshAccessToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
