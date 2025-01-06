import { Module, forwardRef } from '@nestjs/common';

import { LocationModule } from 'src/location/location.module';
import { PartyModule } from 'src/party/party.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [LocationModule, forwardRef(() => PartyModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
