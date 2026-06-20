import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { SmsProvider, SmsProviderPayload } from '@/shared/domain/SmsProvider';

@Injectable()
export class ZiettSmsProvider implements SmsProvider {
  private readonly client = axios.create({
    baseURL: 'https://api.ziett.co/c/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.ZIETT_API_KEY!,
    },
  });

  async send(payload: SmsProviderPayload): Promise<void> {
    try {
      await this.client.post('/messages', {
        remitter_id: process.env.ZIETT_REMITTER_ID!,
        channel_type: 'SMS',
        target_e164: `+244${payload.recipient}`,
        content: payload.content,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Ziett SMS falhou: ${error.response?.data?.message ?? error.message}`,
        );
      }
      throw error;
    }
  }
}
