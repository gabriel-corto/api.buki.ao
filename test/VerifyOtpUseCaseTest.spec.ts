import { RequestOtpUseCase } from '@/modules/auth/application/RequestOtpUseCase';
import { VerifyOtpUseCase } from '@/modules/auth/application/VerifyOtpUseCase';

import { InMemoryOtpRepository } from '@/modules/auth/infra/InMemoryOtpRepository';
import { InMemoryUserRepository } from '@/modules/user/infra/database/inmemory/InMemoryUserRepository';
import { InMemoryTeacherRepository } from '@/modules/user/infra/database/inmemory/InMemoryTeacherRepository';

import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';
import { FakeOtpService } from '@/modules/auth/infra/FakeOtpService';
import { FakeTokenService } from '@/modules/auth/infra/FakeTokenService';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';
import { User } from '@/shared/domain/user/User';

describe('Verify OTP Use Case', () => {
  let otpRepository: InMemoryOtpRepository;
  let userRepository: InMemoryUserRepository;
  let teacherRepository: InMemoryTeacherRepository;
  let otpService: FakeOtpService;
  let tokenService: FakeTokenService;
  let smsProvider: FakeSmsProvider;

  beforeEach(() => {
    otpRepository = new InMemoryOtpRepository();
    userRepository = new InMemoryUserRepository();
    teacherRepository = new InMemoryTeacherRepository();
    otpService = new FakeOtpService('123456');
    tokenService = new FakeTokenService();
    smsProvider = new FakeSmsProvider();
  });

  it('Should be able to verify a OTP code and return an onboarding token', async () => {
    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    const verifyOTPUseCase = new VerifyOtpUseCase(
      otpRepository,
      userRepository,
      tokenService,
      teacherRepository,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    const { onboardingToken, hasUser } = await verifyOTPUseCase.execute({
      code: '123456',
      phone: '922454558',
    });

    expect(hasUser).toBe(false);
    expect(onboardingToken).toBeDefined();
  });

  it('Should be able to verify a OTP code and return an access token', async () => {
    const user = User.create(
      'Fake User',
      '922454558',
      UserAccountType.CUSTOMER,
    );

    await userRepository.save(user);

    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    const verifyOTPUseCase = new VerifyOtpUseCase(
      otpRepository,
      userRepository,
      tokenService,
      teacherRepository,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    const { accessToken, hasUser } = await verifyOTPUseCase.execute({
      code: '123456',
      phone: '922454558',
    });

    expect(hasUser).toBe(true);
    expect(accessToken).toBeDefined();
  });

  it('Should return a error if the OTP code is invalid', async () => {
    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    const verifyOTPUseCase = new VerifyOtpUseCase(
      otpRepository,
      userRepository,
      tokenService,
      teacherRepository,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    await expect(async () => {
      await verifyOTPUseCase.execute({
        code: '123455',
        phone: '922454558',
      });
    }).rejects.toThrow();
  });

  it('Should return a error if the OTP code is expired', async () => {
    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    const verifyOTPUseCase = new VerifyOtpUseCase(
      otpRepository,
      userRepository,
      tokenService,
      teacherRepository,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    await expect(async () => {
      await verifyOTPUseCase.execute({
        code: '1234565',
        phone: '922454558',
      });
    }).rejects.toThrow();
  });
});
