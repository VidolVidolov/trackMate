import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      omit: {
        user: { hashedRefreshToken: true },
      },
    });
  }
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database successfully connected');
    } catch (error) {
      console.error(error);
    }
  }
}
