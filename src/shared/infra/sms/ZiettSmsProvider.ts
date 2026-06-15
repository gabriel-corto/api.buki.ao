/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';

import { SmsProvider, SmsProviderPayload } from '@/shared/domain/SmsProvider';

@Injectable()
export class ZiettSmsProvider implements SmsProvider {
  async send(payload: SmsProviderPayload): Promise<void> {
    try {
      const response = await fetch('https://api.ziett.co/c/v1/messages', {
        method: 'POST',
        signal: AbortSignal.timeout(10000),
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.ZIETT_API_KEY!,
        },
        body: JSON.stringify({
          remitter_id: process.env.ZIETT_REMITTER_ID!,
          channel_type: 'SMS',
          target_e164: `+244${payload.recipient}`,
          content: payload.content,
        }),
      });

      const data = await response.json();

      if (response.status === 202) {
        console.log('Message accepted. Tracking ID:', data.message_id);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
