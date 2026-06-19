import { Injectable } from '@nestjs/common';
import { TeacherPricingTier } from '../../domain/teacher-pricing-tier/TeacherPricingTier';
import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class CreateTeacherPricingTierUseCase {
  constructor(
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(name: string) {
    const pricingTier = TeacherPricingTier.create(name);
    await this.pricingTierRepository.save(pricingTier);
  }
}
