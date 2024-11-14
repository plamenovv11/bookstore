import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { DATABASE_CONNECTION } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: DATABASE_CONNECTION,
        collectionName: 'sessions',
        ttl: 60 * 60,
      }),
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
