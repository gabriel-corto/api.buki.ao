import { RequestOtpUseCase } from '@/modules/auth/application/RequestOtpUseCase';
import { VerifyOtpUseCase } from '@/modules/auth/application/VerifyOtpUseCase';

import { InMemoryOtpRepository } from '@/modules/auth/infra/InMemoryOtpRepository';
import { InMemoryUserRepository } from '@/shared/infra/database/inmemory/InMemoryUserRepository';

import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';
import { FakeOtpService } from '@/modules/auth/infra/FakeOtpService';
import { FakeTokenService } from '@/modules/auth/infra/FakeTokenService';

describe('Verify OTP Use Case', () => {
  test('Should be able to verify a OTP code', async () => {
    const otpRepository = new InMemoryOtpRepository();
    const userRepository = new InMemoryUserRepository();

    const otpService = new FakeOtpService('123456');
    const tokenService = new FakeTokenService();
    const smsProvider = new FakeSmsProvider();

    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    const verifyOTPUseCase = new VerifyOtpUseCase(
      otpRepository,
      userRepository,
      tokenService,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    const { accessToken, onboardingToken, hasUser } =
      await verifyOTPUseCase.execute({
        code: '123456',
        phone: '922454558',
      });

    expect(hasUser).toBe(false);
    expect(onboardingToken).toBeDefined();
    expect(accessToken).toBeUndefined();
  });
});
