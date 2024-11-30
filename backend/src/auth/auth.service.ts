import { AuthJwtPayload } from './types/auth-jwtPayload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser(userDetails: Omit<User, 'id'>) {
    //TODO: extract this in repository
    const user = await this.prismaService.user.findUnique({
      where: { email: userDetails.email },
    });

    if (user) return user;

    //TODO: extract this in repository
    const newUser = await this.prismaService.user.create({
      data: userDetails,
    });
    return newUser;
  }

  async findUser(id: number) {
    //TODO: extract this in repository
    const user = this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  generateAccessToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
