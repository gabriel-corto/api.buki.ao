import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { VerifyOtpUseCaseInput } from './VerifyOtpUseCaseInput';
import { VerifyOtpUseCaseOutput } from './VerifyOtpUseCaseOutput';

import { OtpRepository } from '@/shared/domain/OtpRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';
import { AuthTokenPayload } from '@/shared/types/AuthTokenPayload';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: VerifyOtpUseCaseInput): Promise<VerifyOtpUseCaseOutput> {
    const storedCode = await this.otpRepository.get(input.phone);

    console.log(input);

    if (!storedCode) {
      throw new BadRequestException('Código OTP não encontrado ou expirado.');
    }

    if (storedCode !== input.code) {
      throw new BadRequestException('Código OTP inválido.');
    }
    await this.otpRepository.delete(input.phone);

    const user = await this.userRepository.findByPhone(input.phone);

    if (user) {
      const tokenPayload: AuthTokenPayload = {
        id: user.getId(),
        phone: user.getPhone().getValue(),
        role: user.getRole(),
      };

      const token = await this.jwtService.signAsync(tokenPayload);

      return {
        hasUser: true,
        token,
      };
    }

    return {
      hasUser: false,
    };
  }
}
