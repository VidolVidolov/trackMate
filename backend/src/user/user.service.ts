import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  //TODO: extract in repository
  async getProfile(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return user;
  }
}
