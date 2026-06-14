import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { VerifyOtpUseCaseInput } from './VerifyOtpUseCaseInput';
import { TokenPayload } from '@/shared/types/TokenPayload';

import { OtpRepository } from '@/shared/domain/OtpRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(input: VerifyOtpUseCaseInput) {
    const storedCode = await this.otpRepository.get(input.phone);

    if (!storedCode) {
      throw new BadRequestException('Código OTP não encontrado ou expirado.');
    }

    if (storedCode !== input.code) {
      throw new BadRequestException('Código OTP inválido.');
    }
    await this.otpRepository.delete(input.phone);

    const user = await this.userRepository.findByPhone(input.phone);

    if (user) {
      const accessTokenPayload: TokenPayload = {
        scope: 'access',
        id: user.getId(),
        role: user.getRole(),
        accountType: user.getAcountType(),
        phone: user.getPhone().getValue(),
      };

      const accessToken = this.jwtService.sign(accessTokenPayload);

      return {
        accessToken,
        hasUser: true,
      };
    }

    const onboardingTokenPayload: TokenPayload = {
      scope: 'onboarding',
      phone: input.phone,
    };

    const onboardingToken = this.jwtService.sign(onboardingTokenPayload);

    return {
      hasUser: false,
      onboardingToken,
    };
  }
}
