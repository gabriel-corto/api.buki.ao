import { Module } from '@nestjs/common';
import { AuthController } from './infra/AuthController';
import { UserModule } from '../user/user.module';

import { OtpRepository } from './domain/OtpRepository';
import { OtpService } from './domain/OtpService';
import { JsGeneratorOtpService } from './infra/JsGeneratorOtpService';
import { TokenService } from './domain/TokenService';
import { JwtTokenService } from './infra/JwtTokenService';

import { RequestOtpUseCase } from './application/RequestOtpUseCase';
import { GetMeUseCase } from './application/GetMeUseCase';
import { VerifyOtpUseCase } from './application/VerifyOtpUseCase';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';
import { InMemoryOtpRepository } from './infra/InMemoryOtpRepository';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,
    GetMeUseCase,
    {
      provide: OtpRepository,
      useClass: InMemoryOtpRepository,
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
