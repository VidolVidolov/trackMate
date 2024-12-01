import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserRepository,
  ) {}

  async getProfile(id: number) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    return await this.userRepository.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
  }
}
