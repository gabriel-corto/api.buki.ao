import { BadRequestException, Injectable } from '@nestjs/common';

import { VerifyOtpUseCaseInput } from './VerifyOtpUseCaseInput';

import { OtpRepository } from '@/modules/auth/domain/OtpRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';
import { TokenPayload, TokenService } from '../domain/TokenService';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';
import { TeacherProfileStatus } from '@/modules/user/domain/teacher/TeacherProfileStatus';
import { TeacherRepository } from '@/modules/user/domain/teacher/TeacherRepository';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly teacherRepository: TeacherRepository,
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

    if (!user) {
      const onboardingToken = this.tokenService.generateOnboardingToken({
        scope: 'onboarding',
        phone: input.phone,
      });
      return { hasUser: false, onboardingToken };
    }

    if (user.getAccountType() === UserAccountType.TEACHER) {
      const teacher = await this.teacherRepository.findByUserId(user.getId());

      if (teacher && teacher.getStatus() === TeacherProfileStatus.DRAFT) {
        const onboardingToken = this.tokenService.generateOnboardingToken({
          scope: 'onboarding',
          userId: user.getId(),
          phone: input.phone,
        });
        return { hasUser: true, hasCompleted: false, onboardingToken };
      }
    }

    const accessTokenPayload: TokenPayload = {
      scope: 'access',
      id: user.getId(),
      role: user.getRole(),
      accountType: user.getAccountType(),
      phone: user.getPhone().getValue(),
    };
    const accessToken =
      this.tokenService.generateAccessToken(accessTokenPayload);

    return { accessToken, hasUser: true };
  }
}
