import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [LocationService, LocationRepository],
  exports: [LocationService],
})
export class LocationModule {}
