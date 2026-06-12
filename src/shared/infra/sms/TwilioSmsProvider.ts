import { Injectable } from '@nestjs/common';
import twilio from 'twilio';

import { ISmsProvider } from '@/shared/domain/ISmsProvider';
import { ISmsProviderPayload } from '@/shared/domain/ISmsProviderPayload';

@Injectable()
export class TwilioSmsProvider implements ISmsProvider {
  private readonly client: twilio.Twilio;
  private readonly fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
    const authToken = process.env.TWILIO_AUTH_TOKEN as string;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER as string;
    this.client = twilio(accountSid, authToken);
  }

  async send(data: ISmsProviderPayload): Promise<void> {
    await this.client.messages.create({
      body: data.content,
      from: this.fromNumber,
      to: data.recipient,
    });
  }
}
