import { APP_GUARD } from '@nestjs/core';
import { AUTH_SERVICE } from 'src/consts/moduleNames';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/JwtStrategy';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RefreshJwtStrategy } from './utils/RefreshJwtStrategy';
import { RolesGuard } from './guards/roles/roles.guard';
import { SessionSerializer } from './utils/Serializer';
import { UserModule } from 'src/user/user.module';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    SessionSerializer,
    {
      provide: AUTH_SERVICE, //TODO: what is the better approach, like this or the default one
      useClass: AuthService,
    },
    PrismaService, //TODO: is it okay Like this? to place it everytime
    AuthRepository,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
