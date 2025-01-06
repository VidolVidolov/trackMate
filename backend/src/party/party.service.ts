import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PartyRepository } from './party.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PartyService {
  constructor(
    private partyRepository: PartyRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createParty(userId: number, name: string) {
    const party = await this.partyRepository.createParty(userId, name);
    await this.userService.updateUserParty(userId, party.id);
    await this.userService.updateUserOwnedParty(userId, party.id);
    return party;
  }

  async getPartyByUserId(userId: number) {
    const party = await this.partyRepository.getPartyByUserId(userId);
    return party;
  }
}
