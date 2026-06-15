import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/shared/domain/user/User';
import { TokenPayload } from '@/shared/types/TokenPayload';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

import { Customer } from '../domain/Customer';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { CustomerRepository } from '../domain/CustomerRepository';

import { StartOnboardingUseCaseInput } from './StartOnboardingUseCaseInput';

@Injectable()
export class StartOnBoardingUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(input: StartOnboardingUseCaseInput) {
    if (input.accountType === UserAccountType.CUSTOMER) {
      const user = User.create(
        input.name,
        input.phone,
        UserAccountType.CUSTOMER,
      );
      await this.userRepository.save(user);

      const customer = Customer.create(user.getId());
      await this.customerRepository.save(customer);

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
