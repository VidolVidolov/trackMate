import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PartyRepository {
  constructor(private prismaService: PrismaService) {}

  async createParty(userId: number, name: string) {
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

    const existingParty = await this.prismaService.party.findUnique({
      where: { userId },
    });

    if (existingParty && !existingParty.partyDismissed) {
      throw new Error('A party already exists for this user');
    }

    return this.prismaService.party.create({
      data: {
        userId: userId,
        timeCreated: new Date(),
        startingLocationId: ownerLocation.id,
        distanceTravelled: 0,
        timeTaken: 0,
        name,
        members: {
          connect: [{ id: userId }],
        },
      },
      include: { owner: true, members: true },
    });
  }

  async getPartyByUserId(userId: number) {
    const partyOwnedByUser = await this.prismaService.party.findUnique({
      where: { userId },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            typeOfVehicle: true,
            lastLogin: true,
            lastKnownLocation: true,
            partyId: true,
          },
        },
      },
    });
    return partyOwnedByUser;
  }
}