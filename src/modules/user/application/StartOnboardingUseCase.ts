import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/shared/domain/user/User';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { TokenPayload } from '@/shared/types/TokenPayload';

import { StartOnboardingUseCaseInput } from './StartOnboardingUseCaseInput';

@Injectable()
export class StartOnBoardingUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: StartOnboardingUseCaseInput) {
    if (input.accountType === UserAccountType.CUSTOMER) {
      const user = User.create(
        input.name,
        input.phone,
        UserAccountType.CUSTOMER,
      );

      await this.userRepository.save(user);

      const accessTokenPayload: TokenPayload = {
        scope: 'access',
        id: user.getId(),
        role: user.getRole(),
        phone: user.getPhone().getValue(),
        accountType: user.getAcountType(),
      };
      const accessToken = this.jwtService.sign(accessTokenPayload);

      return {
        hasCompleted: true,
        accessToken,
      };
    }

    const onboardingTokenPayload: TokenPayload = {
      scope: 'onboarding',
      phone: input.phone,
    };

    const onboardingToken = this.jwtService.sign(onboardingTokenPayload, {
      expiresIn: '45m',
    });

    return {
      hasCompleted: false,
      onboardingToken,
    };
  }
}
