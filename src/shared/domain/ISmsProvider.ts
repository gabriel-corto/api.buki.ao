import { ISmsProviderPayload } from './ISmsProviderPayload';

export abstract class ISmsProvider {
  abstract send(data: ISmsProviderPayload): Promise<void>;
}
