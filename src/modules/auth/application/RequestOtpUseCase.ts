import { Injectable } from '@nestjs/common';

import { RequestOtpUseCaseInput } from './RequestOtpUseCaseInput';
import { generateOTPCode } from '@/shared/helpers/GenerateOTPCode';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { OtpRepository } from '@/modules/auth/domain/OtpRepository';

@Injectable()
export class RequestOtpUseCase {
  constructor(
    private readonly smsProvider: SmsProvider,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(input: RequestOtpUseCaseInput): Promise<void> {
    const phone = input.phone;
    const generatedOTP = generateOTPCode();

    await this.smsProvider.send({
      content: `Seu código de acesso é ${generatedOTP}`,
      recipient: phone,
    });

    return await this.otpRepository.save(phone, generatedOTP);
  }
}
