import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async createUserFromGoogleAuth(userDetails: Omit<User, 'id'>) {
    return await this.prismaService.user.create({
      data: userDetails,
    });
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
  async findUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
