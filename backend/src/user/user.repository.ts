import { Injectable, NotFoundException } from '@nestjs/common';

import { PartyService } from 'src/party/party.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    private partyService: PartyService,
  ) {}

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
    try {
      return await this.prismaService.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.log('-------------------'); //TODO: how to handle errors in nestjs and propagate it to the frontend
      console.log(error);
      console.log('-------------------');
    }
  }

  async updateUserLastLoginTime(userId: number) {
    try {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
      });
    } catch (error) {
      console.log('-------------------');
      console.log(error);
      console.log('-------------------');
    }
  }

  async updateUserParty(userId: number, partyId: number) {
    try {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: { partyId },
      });
    } catch (error) {
      console.log('-------------------');
      console.log(error);
      console.log('-------------------');
    }
  }

  async updateUserOwnedParty(userId: number, ownedPartyId: number) {
    try {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: { ownedPartyId },
      });
    } catch (error) {
      console.log('-------------------');
      console.log(error);
      console.log('-------------------');
    }
  }

  async getPartyByMemberId(userId: number) {
    try {
      const user = await this.findUserById(userId);
      const partyId = user?.partyId;
      if (!partyId) throw new NotFoundException('User does not have a party');
      return await this.partyService.getPartyById(partyId);
    } catch (error) {
      console.log('-------------------');
      console.log(error);
      console.log('-------------------');
    }
  }
}
