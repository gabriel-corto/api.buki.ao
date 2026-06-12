import { Injectable } from '@nestjs/common';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { SmsProviderPayload } from '@/shared/domain/SmsProviderPayload';

@Injectable()
export class ZiettSmsProvider extends SmsProvider {
  async send(data: SmsProviderPayload): Promise<void> {
    await Promise.resolve();
    console.log('Mensagem Enviada com a ziett para ', data.recipient);
  }
}
