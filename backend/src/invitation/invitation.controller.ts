import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { RequestWithUser } from 'src/auth/types/RequestWithUser';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  @Post('/create')
  async createParty(@Req() request: RequestWithUser) {
    const { id } = request.user;
    const partyId = request.body.partyId;
    try {
      return await this.invitationService.createInvitation(partyId, id);
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
}
