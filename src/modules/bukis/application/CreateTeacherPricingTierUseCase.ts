import { Injectable } from '@nestjs/common';
import { TeacherPricingTier } from '../domain/teacher-pricing-tier/TeacherPricingTier';
import { TeacherPricingTierRepository } from '../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class CreateTeacherPricingTierUseCase {
  constructor(
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(value: string) {
    const pricingTier = TeacherPricingTier.create(value);
    await this.pricingTierRepository.save(pricingTier);
  }
}
