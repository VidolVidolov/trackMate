import { InvitationController } from './invitation.controller';
import { InvitationRepository } from './invitation.repository';
import { InvitationService } from './invitation.service';
import { Module } from '@nestjs/common';
import { PartyModule } from 'src/party/party.module';

@Module({
  imports: [PartyModule],
  controllers: [InvitationController],
  providers: [InvitationService, InvitationRepository],
})
export class InvitationModule {}
