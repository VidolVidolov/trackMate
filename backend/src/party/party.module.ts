import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyRepository } from './party.repository';
import { PartyService } from './party.service';

@Module({
  controllers: [PartyController],
  providers: [PartyService, PartyRepository],
})
export class PartyModule {}
