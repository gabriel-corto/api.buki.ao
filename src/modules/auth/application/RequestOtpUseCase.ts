import { Injectable } from '@nestjs/common';

import { RequestOtpUseCaseInput } from './RequestOtpUseCaseInput';
import { generateOTPCode } from '@/shared/helpers/GenerateOTPCode';
import { ISmsProvider } from '@/shared/domain/ISmsProvider';

@Injectable()
export class RequestOtpUseCase {
  constructor(private readonly smsProvider: ISmsProvider) {}

  async execute(input: RequestOtpUseCaseInput) {
    const phone = input.phone;

    // Gerar código OTP
    const generatedOTP = generateOTPCode();

    // Enviar código de acesso
    await this.smsProvider.send({
      content: `Seu código de acesso é ${generatedOTP}`,
      recipient: phone,
    });

    return {
      message: 'Código de acesso enviado com sucesso',
    };
  }
}
