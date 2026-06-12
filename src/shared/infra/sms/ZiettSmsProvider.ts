import { Injectable } from '@nestjs/common';

import { ISmsProvider } from '@/shared/domain/ISmsProvider';
import { ISmsProviderPayload } from '@/shared/domain/ISmsProviderPayload';

@Injectable()
export class ZiettSmsProvider extends ISmsProvider {
  async send(data: ISmsProviderPayload): Promise<void> {
    await Promise.resolve();
    console.log('Mensagem Enviada com a ziett para ', data.recipient);
  }
}
