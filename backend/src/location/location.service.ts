import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async updateLocationForUser(
    userId: number,
    location: Prisma.LocationCreateInput,
  ) {
    if (!userId && userId !== 0) {
      return;
    }

    const hasLocation = await this.locationRepository.checkUserLocation(userId);

    if (!hasLocation) {
      await this.locationRepository.createUserLocation(userId, location);
    } else {
      await this.locationRepository.updateLocationForUser(userId, location);
    }

    return location;
  }
}
