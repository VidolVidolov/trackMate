import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PassportModule.register({ session: true }), UserModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
