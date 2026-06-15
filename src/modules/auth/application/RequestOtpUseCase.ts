import { Injectable } from '@nestjs/common';

import { RequestOtpUseCaseInput } from './RequestOtpUseCaseInput';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { OtpRepository } from '@/modules/auth/domain/OtpRepository';
import { OtpService } from '../domain/OtpService';

@Injectable()
export class RequestOtpUseCase {
  constructor(
    private readonly smsProvider: SmsProvider,
    private readonly otpRepository: OtpRepository,
    private readonly otpService: OtpService,
  ) {}

  async execute(input: RequestOtpUseCaseInput): Promise<void> {
    const phone = input.phone;
    const generatedOTP = this.otpService.generate();

    await this.smsProvider.send({
      content: `Seu código de acesso é ${generatedOTP}`,
      recipient: phone,
    });

    return await this.otpRepository.save(phone, generatedOTP);
  }
}
