import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/JwtStrategy';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RefreshJwtStrategy } from './utils/RefreshJwtStrategy';
import { SessionSerializer } from './utils/Serializer';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    SessionSerializer,
    {
      provide: AUTH_SERVICE, //TODO: what is the better approach, like this or the default one
      useClass: AuthService,
    },
    PrismaService, //TODO: is it okay Like this? ot place it everytime
    AuthRepository,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
