import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LocationRepository {
  constructor(private prismaService: PrismaService) {}

  async updateLocationForUser(
    userId: number,
    location: Prisma.LocationCreateInput,
  ) {
    return this.prismaService.location.update({
      where: {
        userId,
      },
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }

  async checkUserLocation(userId: number) {
    return this.prismaService.location.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async createUserLocation(
    userId: number,
    location: Prisma.LocationCreateInput,
  ) {
    return this.prismaService.location.create({
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
        userId,
      },
    });
  }
}
