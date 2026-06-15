import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';
import { RequestOtpUseCase } from '@/modules/auth/application/RequestOtpUseCase';
import { InMemoryOtpRepository } from '@/modules/auth/infra/InMemoryOtpRepository';
import { FakeOtpService } from '@/modules/auth/infra/FakeOtpService';

describe('Request OTP Use Case', () => {
  it('Should request OTP successfully', async () => {
    const otpRepository = new InMemoryOtpRepository();
    const otpService = new FakeOtpService('123456');
    const smsProvider = new FakeSmsProvider();

    const requestOtpUseCase = new RequestOtpUseCase(
      smsProvider,
      otpRepository,
      otpService,
    );

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    const otp = await otpRepository.get('922454558');
    expect(otp).toBe('123456');
  });
});
