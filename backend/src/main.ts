import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

async function bootstrap() {
  config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(
    session({
      secret: process.env.SESSION_SALT!,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}

bootstrap().catch((error) => console.error(error));
