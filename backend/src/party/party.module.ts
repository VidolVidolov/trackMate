import { Module, forwardRef } from '@nestjs/common';

import { PartyController } from './party.controller';
import { PartyRepository } from './party.repository';
import { PartyService } from './party.service';
import { SocketModule } from 'src/socket/socket.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => SocketModule)],
  controllers: [PartyController],
  providers: [PartyService, PartyRepository],
  exports: [PartyService],
})
export class PartyModule {}
