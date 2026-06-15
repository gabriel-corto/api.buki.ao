import { Injectable } from '@nestjs/common';

import { SmsProvider, SmsProviderPayload } from '@/shared/domain/SmsProvider';

@Injectable()
export class ZiettSmsProvider extends SmsProvider {
  async send(data: SmsProviderPayload): Promise<void> {
    await Promise.resolve();
    console.log('Mensagem Enviada com a ziett para ', data.recipient);
  }
}
