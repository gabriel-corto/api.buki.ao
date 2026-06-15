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
import { UploadTeacherAvatarUseCase } from './modules/user/application/UploadTeacherAvatarUseCase';

import { SmsProvider } from './shared/domain/SmsProvider';
import { RedisModule } from './shared/infra/database/redis/redis.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';

import { OtpRepository } from './modules/auth/domain/OtpRepository';
import { RedisOtpRepository } from './modules/auth/infra/RedisOtpRepository';

import { UserRepository } from './shared/domain/user/UserRepository';
import { InMemoryUserRepository } from './shared/infra/database/inmemory/InMemoryUserRepository';

import { CustomerRepository } from './modules/user/domain/CustomerRepository';
import { InMemoryCustomerRepository } from './modules/user/infra/database/inmemory/InMemoryCustomerRepository';

import { TeacherRepository } from './modules/user/domain/TeacherRepository';
import { InMemoryTeacherRepository } from './modules/user/infra/database/inmemory/InMemoryTeacherRepository';

import { JsGeneratorOtpService } from './modules/auth/infra/JsGeneratorOtpService';
import { OtpService } from './modules/auth/domain/OtpService';
import { JwtTokenService } from './modules/auth/infra/JwtTokenService';
import { TokenService } from './modules/auth/domain/TokenService';
import { TwilioSmsProvider } from './shared/infra/sms/TwilioSmsProvider';
import { StorageService } from './shared/domain/StorageService';
import { CloudinaryStorageService } from './shared/infra/storage/CloudinaryStorageService';

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
    UploadTeacherAvatarUseCase,
    {
      provide: SmsProvider,
      useClass: TwilioSmsProvider,
    },
    {
      provide: OtpRepository,
      useClass: RedisOtpRepository,
    },
    {
      provide: OtpService,
      useClass: JsGeneratorOtpService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    {
      provide: StorageService,
      useClass: CloudinaryStorageService,
    },
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
    {
      provide: CustomerRepository,
      useClass: InMemoryCustomerRepository,
    },
    {
      provide: TeacherRepository,
      useClass: InMemoryTeacherRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
