import { PricePolicy } from './PricePolicy';
import { PriceTier } from './PriceTier';

export abstract class PricePolicyRepository {
  abstract save(pricePolicy: PricePolicy): Promise<PricePolicy>;
  abstract findByTier(tier: PriceTier): Promise<PricePolicy | null>;
  abstract findAll(): Promise<PricePolicy[]>;
  abstract findById(id: string): Promise<PricePolicy | null>;
  abstract delete(id: string): Promise<void>;
}
