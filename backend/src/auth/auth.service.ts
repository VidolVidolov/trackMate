import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async validateUser(userDetails: Omit<User, 'id'>) {
    const user = await this.prismaService.user.findUnique({
      where: { email: userDetails.email },
    });

    if (user) return user;

    const newUser = await this.prismaService.user.create({
      data: userDetails,
    });
    return newUser;
  }

  async findUser(id: number) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    return user;
  }
}
