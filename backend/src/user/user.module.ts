import { LocationModule } from 'src/location/location.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [LocationModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
