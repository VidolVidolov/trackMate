import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InvitationRepository {
  constructor(private prismaService: PrismaService) {}

  async createInvitation(partyId: number) {
    const inviteCode = uuid();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    return await this.prismaService.invitation.create({
      data: {
        partyId,
        inviteCode,
        expiresAt,
      },
    });
  }

  async validateInvite(inviteCode: string) {
    return await this.prismaService.invitation.findUnique({
      where: { inviteCode },
      include: { party: true },
    });
  }

  async findInvitation(inviteCode: string) {
    return await this.prismaService.invitation.findUnique({
      where: { inviteCode },
    });
  }

  async acceptInvitation(partyId: number, userId: number) {
    return await this.prismaService.party.update({
      where: { id: partyId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
  }

  async deleteInvitation(inviteCode: string) {
    return await this.prismaService.invitation.delete({
      where: { inviteCode },
    });
  }
}
