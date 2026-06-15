import { ValidationPipe } from '@nestjs/common';
import dns from 'node:dns';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dns.setDefaultResultOrder('ipv4first');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap().catch((err) => console.error(err));
