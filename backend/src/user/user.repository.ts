import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
