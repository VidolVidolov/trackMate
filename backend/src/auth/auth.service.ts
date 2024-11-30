import { AuthJwtPayload } from './types/auth-jwtPayload';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}
  async validateUser(userDetails: Omit<User, 'id'>) {
    const user = await this.authRepository.findUserByEmail(userDetails.email);

    if (user) return user;

    //TODO: what is the better variant  - allocate memory for new variable as its more descriptive or directly return what is returned from the repository?
    const newUser =
      await this.authRepository.createUserFromGoogleAuth(userDetails);
    return newUser;
  }

  async findUser(id: number) {
    const user = this.authRepository.findUserById(id);
    return user;
  }

  generateAccessToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
