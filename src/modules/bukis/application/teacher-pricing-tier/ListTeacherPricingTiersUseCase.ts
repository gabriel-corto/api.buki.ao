import { Injectable } from '@nestjs/common';
import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class ListTeacherPricingTiersUseCase {
  constructor(
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute() {
    const pricingTiers = await this.pricingTierRepository.findAll();
    return pricingTiers.map((tier) => ({
      id: tier.getId(),
      value: tier.getValue(),
      status: tier.getStatus(),
    }));
  }
}
