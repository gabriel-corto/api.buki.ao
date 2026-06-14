import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './shared/infra/AppController';
import { AuthController } from './modules/auth/infra/AuthController';

import { RequestOtpUseCase } from './modules/auth/application/RequestOtpUseCase';
import { VerifyOtpUseCase } from './modules/auth/application/VerifyOtpUseCase';

import { SmsProvider } from './shared/domain/SmsProvider';
import { TwilioSmsProvider } from './shared/infra/sms/TwilioSmsProvider';

import { RedisModule } from './shared/infra/database/redis/redis.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';
import { OtpRepository } from './shared/domain/OtpRepository';
import { RedisOtpRepository } from './shared/infra/database/redis/RedisOtpRepository';
import { UserRepository } from './shared/domain/user/UserRepository';
import { InMemoryUserRepository } from './shared/infra/database/inmemory/InMemoryUserRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule,
    PrismaModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,

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
  ],
})
export class AppModule {}
