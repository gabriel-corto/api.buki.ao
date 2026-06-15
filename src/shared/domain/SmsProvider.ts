export interface SmsProviderPayload {
  recipient: string;
  content: string;
}

export abstract class SmsProvider {
  abstract send(data: SmsProviderPayload): Promise<void>;
}
