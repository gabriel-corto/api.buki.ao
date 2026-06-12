import { Module } from '@nestjs/common';

import { AppController } from './shared/infra/AppController';
import { AuthController } from './modules/auth/infra/AuthController';

import { RequestOtpUseCase } from './modules/auth/application/RequestOtpUseCase';

import { ISmsProvider } from './shared/domain/ISmsProvider';
import { TwilioSmsProvider } from './shared/infra/sms/TwilioSmsProvider';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [
    RequestOtpUseCase,
    {
      provide: ISmsProvider,
      useClass: TwilioSmsProvider,
    },
  ],
})
export class AppModule {}
