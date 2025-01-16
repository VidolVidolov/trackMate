import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/prisma.module';
import { InvitationModule } from './invitation/invitation.module';
import { LocationModule } from './location/location.module';
import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { PassportModule } from '@nestjs/passport';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';
import { configuration } from 'src/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule,
    AuthModule,
    PassportModule.register({ session: true }),
    UserModule,
    PartyModule,
    LocationModule,
    InvitationModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
