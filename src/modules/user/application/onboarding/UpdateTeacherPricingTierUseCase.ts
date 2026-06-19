import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { TeacherRepository } from '../../domain/teacher/TeacherRepository';
import { UpdateTeacherPricingTierUseCaseInput } from './UpdateTeacherPricingTierUseCaseInput';
import { TeacherPricingTierRepository } from '@/modules/bukis/domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class UpdateTeacherPricingTierUseCase {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(input: UpdateTeacherPricingTierUseCaseInput): Promise<void> {
    const teacher = await this.teacherRepository.findByUserId(input.userId);

    if (!teacher) {
      throw new BadRequestException('Professor não encontrado!');
    }

    const pricingTier = await this.pricingTierRepository.findById(
      input.pricingTierId,
    );

    if (!pricingTier) {
      throw new BadRequestException('Intervalo de preço não encontrado!');
    }

    teacher.updatePriceTier(pricingTier);
    await this.teacherRepository.save(teacher);
  }
}
