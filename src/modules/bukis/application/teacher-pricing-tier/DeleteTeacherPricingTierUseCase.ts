import { Injectable, NotFoundException } from '@nestjs/common';

import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class DeleteTeacherPricingTierUseCase {
  constructor(
    private readonly teacherPricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(id: string) {
    const pricingTier = await this.teacherPricingTierRepository.findById(id);

    if (!pricingTier) {
      throw new NotFoundException('Plano de preço não encontrado.');
    }

    await this.teacherPricingTierRepository.delete(id);
  }
}
