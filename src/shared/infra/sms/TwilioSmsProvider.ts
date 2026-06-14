/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import twilio from 'twilio';

import { SmsProvider } from '@/shared/domain/SmsProvider';
import { SmsProviderPayload } from '@/shared/domain/SmsProviderPayload';

@Injectable()
export class TwilioSmsProvider implements SmsProvider {
  private readonly client: twilio.Twilio;
  private readonly fromNumber: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID')!;
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN')!;
    this.fromNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER')!;
    this.client = twilio(accountSid, authToken);
  }

  async send(data: SmsProviderPayload): Promise<void> {
    try {
      console.log(`[TwilioSmsProvider] Sending SMS to ${data.recipient}...`);
      await this.client.messages.create({
        body: data.content,
        from: this.fromNumber,
        to: '+244' + data.recipient,
      });
      console.log(`[TwilioSmsProvider] SMS sent to ${data.recipient}`);
    } catch (error: any) {
      console.error(
        `[TwilioSmsProvider] Error sending SMS to ${data.recipient}: ${error.message}`,
      );
      throw error;
    }
  }
}
