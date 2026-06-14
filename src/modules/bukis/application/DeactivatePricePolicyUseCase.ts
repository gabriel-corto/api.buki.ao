import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { PricePolicy } from '../domain/price/PricePolicy';
import { PricePolicyRepository } from '../domain/price/PricePolicyRepository';

@Injectable()
export class DeactivatePricePolicyUseCase {
  constructor(private readonly pricePolicyRepository: PricePolicyRepository) {}

  async execute(id: string): Promise<PricePolicy> {
    const pricePolicy = await this.pricePolicyRepository.findById(id);

    if (!pricePolicy) {
      throw new Error('PricePolicy not found');
    }

    if (pricePolicy.getStatus() === SharedStatus.INACTIVE) {
      throw new Error('PricePolicy is already inactive');
    }

    pricePolicy.deactivate();
    return this.pricePolicyRepository.save(pricePolicy);
  }
}
