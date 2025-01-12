import { Module, forwardRef } from '@nestjs/common';

import { LocationModule } from 'src/location/location.module';
import { PartyModule } from 'src/party/party.module';
import { SocketService } from './socket.service';

@Module({
  imports: [LocationModule, forwardRef(() => PartyModule)],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
