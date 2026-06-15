import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './shared/guard/auth.guard';

import { AppController } from './shared/infra/http/AppController';
import { AuthController } from './modules/auth/infra/AuthController';
import { UserController } from './modules/user/infra/http/UserController';

import { RequestOtpUseCase } from './modules/auth/application/RequestOtpUseCase';
import { VerifyOtpUseCase } from './modules/auth/application/VerifyOtpUseCase';
import { StartOnBoardingUseCase } from './modules/user/application/StartOnboardingUseCase';

import { SmsProvider } from './shared/domain/SmsProvider';
import { TwilioSmsProvider } from './shared/infra/sms/TwilioSmsProvider';
import { RedisModule } from './shared/infra/database/redis/redis.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';

import { OtpRepository } from './modules/auth/domain/OtpRepository';
import { UserRepository } from './shared/domain/user/UserRepository';
import { RedisOtpRepository } from './shared/infra/database/redis/RedisOtpRepository';
import { InMemoryUserRepository } from './shared/infra/database/inmemory/InMemoryUserRepository';

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
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,
    StartOnBoardingUseCase,
    {
      provide: SmsProvider,
      useClass: TwilioSmsProvider,
    },
    {
      provide: OtpRepository,
      useClass: RedisOtpRepository,
    },
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
