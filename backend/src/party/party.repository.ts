import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export class PartyRepository {
  constructor(private prismaService: PrismaService) {}

  async createParty(userId: number) {
    const ownerLocation = await this.prismaService.location.findUnique({
      where: { userId },
    });
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!ownerLocation) {
      throw new Error('Owner does not have a location');
    }

    await this.prismaService.party.create({
      data: {
        userId,
        timeCreated: new Date(),
        locationId: ownerLocation.id,
        owner: { connect: { id: userId } },
      },
      include: { owner: true },
    });
  }
}
