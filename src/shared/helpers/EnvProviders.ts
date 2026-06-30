import { Type } from '@nestjs/common';

import { SmsProvider } from '../domain/SmsProvider';
import { FakeSmsProvider } from '../infra/sms/FakeSmsProvider';
import { TwilioSmsProvider } from '../infra/sms/TwilioSmsProvider';
import { ZiettSmsProvider } from '../infra/sms/ZiettSmsProvider';

import { OtpRepository } from '@/modules/auth/domain/OtpRepository';
import { InMemoryOtpRepository } from '@/modules/auth/infra/InMemoryOtpRepository';
import { RedisOtpRepository } from '@/modules/auth/infra/RedisOtpRepository';

export function getSmsProvider(): Type<SmsProvider> {
  if (process.env.ENVIROMENT === 'LOCAL') return FakeSmsProvider;
  if (process.env.ENVIROMENT === 'DEV') return TwilioSmsProvider;

  return ZiettSmsProvider;
}

export function getOtpRepository(): Type<OtpRepository> {
  if (process.env.ENVIROMENT === 'LOCAL') return InMemoryOtpRepository;
  if (process.env.ENVIROMENT === 'DEV') return RedisOtpRepository;

  return RedisOtpRepository;
}
