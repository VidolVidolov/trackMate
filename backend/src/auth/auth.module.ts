import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    PrismaService, // is it okay Like this? ot place it everytime
  ],
})
export class AuthModule {}
