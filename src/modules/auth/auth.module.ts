import { Module } from '@nestjs/common';
import { AuthController } from './infra/AuthController';
import { UserModule } from '../user/user.module';

import { OtpRepository } from './domain/OtpRepository';
import { RedisOtpRepository } from './infra/RedisOtpRepository';
import { OtpService } from './domain/OtpService';
import { JsGeneratorOtpService } from './infra/JsGeneratorOtpService';
import { TokenService } from './domain/TokenService';
import { JwtTokenService } from './infra/JwtTokenService';

import { RequestOtpUseCase } from './application/RequestOtpUseCase';
import { GetMeUseCase } from './application/GetMeUseCase';
import { VerifyOtpUseCase } from './application/VerifyOtpUseCase';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { TwilioSmsProvider } from '@/shared/infra/sms/TwilioSmsProvider';
import { ZiettSmsProvider } from '@/shared/infra/sms/ZiettSmsProvider';
import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,
    GetMeUseCase,
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
      provide: SmsProvider,
      useClass: FakeSmsProvider,
    },
  ],
})
export class AuthModule {}
