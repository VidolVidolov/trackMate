import { Injectable } from '@nestjs/common';
import { PartyRepository } from './party.repository';

@Injectable()
export class PartyService {
  constructor(private partyRepository: PartyRepository) {}

  async createParty(userId: number) {
    return this.partyRepository.createParty(userId);
  }
}
