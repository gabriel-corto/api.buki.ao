import { SmsProviderPayload } from './SmsProviderPayload';

export abstract class SmsProvider {
  abstract send(data: SmsProviderPayload): Promise<void>;
}
