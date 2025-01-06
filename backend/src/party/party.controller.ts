import { Controller, Post, Req } from '@nestjs/common';

import { RequestWithUser } from 'src/auth/types/RequestWithUser';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Post('/create')
  async createParty(@Req() request: RequestWithUser) {
    const { id } = request.user;

    try {
      await this.partyService.createParty(id);
    } catch (error) {
      console.log(error);
    }
  }
}
