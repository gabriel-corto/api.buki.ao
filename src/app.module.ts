import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthGuard } from './shared/guard/auth.guard';
import { AppController } from './shared/infra/http/AppController';

import { RedisModule } from './shared/infra/database/redis/redis.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BukisModule } from './modules/bukis/bukis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule,
    PrismaModule,
    AuthModule,
    UserModule,
    BukisModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
