import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PartyRepository } from './party.repository';
import { UserService } from 'src/user/user.service';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class PartyService {
  constructor(
    private partyRepository: PartyRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => SocketService))
    private socketService: SocketService,
  ) {}

  async createParty(userId: number, name: string) {
    const party = await this.partyRepository.createParty(userId, name);
    await this.userService.updateUserParty(userId, party.id);
    await this.userService.updateUserOwnedParty(userId, party.id);
    this.socketService.handlePartyUpdate({
      partyId: party.id,
    });
    return party;
  }

  async getPartyByUserId(userId: number) {
    const party = await this.partyRepository.getPartyByUserId(userId);
    if (party?.partyDismissed) {
      return null;
    }
    return party;
  }

  async dismissParty(userId: number) {
    const userParty = await this.partyRepository.getPartyByUserId(userId);
    if (userParty?.userId !== userId || !userParty) {
      throw new UnauthorizedException();
    }
    const dismissedParty = await this.partyRepository.dismissParty(
      userParty.id,
    );
    await this.socketService.handlePartyUpdate(null);
    return dismissedParty;
  }

  async addMemberToParty(memberId: number, partyId: number) {
    const party = await this.partyRepository.getPartyById(partyId);
    if (party?.members.find((member) => member.id === memberId)) {
      throw new ConflictException('Member is already part of the party.');
    }
    if (party?.partyDismissed) {
      throw new ConflictException('Party is dismissed.');
    }
    const member = await this.userService.getProfile(memberId);
    if (!member) {
      throw new NotFoundException('Member does not exist');
    }
    return this.partyRepository.addMemberToParty(member.id, partyId);
  }

  async getPartyById(partyId: number) {
    return this.partyRepository.getPartyById(partyId);
  }
}
