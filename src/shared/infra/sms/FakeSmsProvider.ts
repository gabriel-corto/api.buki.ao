import { Injectable } from '@nestjs/common';
import { SmsProvider, SmsProviderPayload } from '@/shared/domain/SmsProvider';

@Injectable()
export class FakeSmsProvider implements SmsProvider {
  async send(data: SmsProviderPayload): Promise<void> {
    await Promise.resolve();
    // eslint-disable-next-line no-console
    console.log('Mensagem Enviada para ', data.recipient);
  }
}
