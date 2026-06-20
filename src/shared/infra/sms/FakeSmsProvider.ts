import { Injectable } from '@nestjs/common';
import { SmsProvider, SmsProviderPayload } from '@/shared/domain/SmsProvider';

@Injectable()
export class FakeSmsProvider implements SmsProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send(data: SmsProviderPayload): Promise<void> {
    console.log(data.content);
    await Promise.resolve();
  }
}
