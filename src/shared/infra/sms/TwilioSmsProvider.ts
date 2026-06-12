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
      await this.client.messages.create({
        body: data.content,
        from: this.fromNumber,
        to: data.recipient,
      });
    } catch (error: any) {
      console.error('Twilio Error Details:', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: error.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        code: error.code,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        status: error.status,
      });
      throw error;
    }
  }
}
