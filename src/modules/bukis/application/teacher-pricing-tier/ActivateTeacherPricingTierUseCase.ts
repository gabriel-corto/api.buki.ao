import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class ActivateTeacherPricingTierUseCase {
  constructor(
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(id: string) {
    const pricingTier = await this.pricingTierRepository.findById(id);

    if (!pricingTier) {
      throw new NotFoundException('Intervalo de preço não encontrada.');
    }

    if (pricingTier.getStatus() === SharedStatus.ACTIVE) {
      throw new BadRequestException('Intervalo de preço já está ativa.');
    }

    pricingTier.activate();
    await this.pricingTierRepository.save(pricingTier);
  }
}
