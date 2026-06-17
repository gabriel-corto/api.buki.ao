import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/shared/domain/user/User';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

import { Customer } from '../domain/Customer';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { CustomerRepository } from '../domain/CustomerRepository';
import { Teacher } from '../domain/Teacher';
import { TeacherRepository } from '../domain/TeacherRepository';

import { StartOnboardingUseCaseInput } from './StartOnboardingUseCaseInput';
import { TokenPayload } from '@/modules/auth/domain/TokenService';

@Injectable()
export class StartOnBoardingUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(input: StartOnboardingUseCaseInput) {
    const existingUser = await this.userRepository.findByPhone(input.phone);

    if (existingUser) {
      throw new ConflictException();
    }

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

    const user = User.create(input.name, input.phone, input.accountType);
    await this.userRepository.save(user);

    const teacher = Teacher.create(user.getId());
    await this.teacherRepository.save(teacher);

    const onboardingTokenPayload: TokenPayload = {
      scope: 'onboarding',
      userId: user.getId(),
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
