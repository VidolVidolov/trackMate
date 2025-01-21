import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InvitationRepository } from './invitation.repository';
import { PartyService } from 'src/party/party.service';

@Injectable()
export class InvitationService {
  constructor(
    private invitationRepository: InvitationRepository,
    private partyService: PartyService,
    private config: ConfigService,
  ) {}

  async createInvitation(partyId: number, userId: number) {
    const party = await this.partyService.getPartyById(partyId);
    if (party?.userId !== userId)
      throw new UnauthorizedException('User does not own the party');
    const invite = await this.invitationRepository.createInvitation(partyId);
    return `http://${this.config.get('FRONT_END_LINK')}?invite=${invite.inviteCode}`;
  }

  async validateInvite(inviteCode: string) {
    const invitation =
      await this.invitationRepository.validateInvite(inviteCode);

    if (!invitation) throw new NotFoundException('Invitation not found.');
    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired.');
    }

    return true;
  }

  async acceptInvite(inviteCode: string, userId: number) {
    const invitation =
      await this.invitationRepository.findInvitation(inviteCode);

    if (!invitation) throw new NotFoundException('Invitation not found.');
    await this.invitationRepository.acceptInvitation(
      invitation.partyId,
      userId,
    );
    return invitation.partyId;
  }
}
