import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/prisma.module';
import { LocationModule } from './location/location.module';
import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PassportModule.register({ session: true }),
    UserModule,
    PartyModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
