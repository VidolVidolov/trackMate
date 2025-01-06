import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async createUserFromGoogleAuth(userDetails: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: userDetails,
    });
  }
}
