import { Injectable, NotFoundException } from '@nestjs/common';

import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class UpdateBukiPricingTierUseCase {
  constructor(
    private readonly teacherPricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(id: string, value: string) {
    const pricingTier = await this.teacherPricingTierRepository.findById(id);

    if (!pricingTier) {
      throw new NotFoundException('Plano de preço não encontrado.');
    }

    pricingTier.setValue(value);
    await this.teacherPricingTierRepository.save(pricingTier);
  }
}
