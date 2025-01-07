import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { RequestWithUser } from 'src/auth/types/RequestWithUser';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Post('/create')
  async createParty(@Req() request: RequestWithUser) {
    const { id } = request.user;
    const name = request.body.name;
    try {
      return await this.partyService.createParty(id, name);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.METHOD_NOT_ALLOWED,
          error: error.message,
        },
        HttpStatus.METHOD_NOT_ALLOWED,
        {
          cause: error.message,
        },
      );
    }
  }

  @Post('dismiss')
  async dismissParty(@Req() request: RequestWithUser) {
    const { id } = request.user;
    try {
      return await this.partyService.dismissParty(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('add-member/:partyId')
  async addMemberToParty(
    @Req() request: RequestWithUser,
    @Param('partyId') partyId: string,
  ) {
    const { id } = request.user;
    try {
      return await this.partyService.addMemberToParty(id, Number(partyId));
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('join/:partyId')
  async joinParty(
    @Req() request: RequestWithUser,
    @Param('partyId') partyId: string,
  ) {
    const { id } = request.user;
    try {
      return await this.partyService.addMemberToParty(id, Number(partyId));
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
