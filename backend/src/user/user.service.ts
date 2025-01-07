import { Injectable, NotFoundException } from '@nestjs/common';

import { PartyService } from 'src/party/party.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserRepository,
    private partyService: PartyService,
  ) {}

  async getProfile(id: number) {
    return this.userRepository.findUserById(id);
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

  async deleteUser(userId: number) {
    return await this.userRepository.deleteUser(userId);
  }

  async updateUserLastLoginTime(userId: number) {
    return this.userRepository.updateUserLastLoginTime(userId);
  }

  async updateUserParty(userId: number, partyId: number) {
    return this.userRepository.updateUserParty(userId, partyId);
  }
  async updateUserOwnedParty(userId: number, partyId: number) {
    return this.userRepository.updateUserOwnedParty(userId, partyId);
  }

  async getUserParty(userId: number) {
    const userParty = await this.partyService.getPartyByUserId(userId);
    if (!userParty) {
      const userMemberParty =
        await this.userRepository.getPartyByMemberId(userId);
      if (!userMemberParty) {
        throw new NotFoundException('User does not have a party');
      }
      return userMemberParty;
    }
    return userParty;
  }
}
