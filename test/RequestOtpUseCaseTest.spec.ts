import { FakeSmsProvider } from '@/shared/infra/sms/FakeSmsProvider';
import { RequestOtpUseCase } from '@/modules/auth/application/RequestOtpUseCase';
import { InMemoryOtpRepository } from '@/modules/auth/infra/InMemoryOtpRepository';

describe('Request OTP Use Case', () => {
  it('Should request OTP successfully', async () => {
    const otpRepository = new InMemoryOtpRepository();
    const smsProvider = new FakeSmsProvider();
    const requestOtpUseCase = new RequestOtpUseCase(smsProvider, otpRepository);

    await requestOtpUseCase.execute({
      phone: '922454558',
    });

    const otp = await otpRepository.get('922454558');
    expect(otp).toBeDefined();
  });
});
