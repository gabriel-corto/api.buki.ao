import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { TeacherPricingTierRepository } from '../../domain/teacher-pricing-tier/TeacherPricingTierRepository';

@Injectable()
export class DeactivateTeacherPricingTierUseCase {
  constructor(
    private readonly pricingTierRepository: TeacherPricingTierRepository,
  ) {}

  async execute(id: string) {
    const pricingTier = await this.pricingTierRepository.findById(id);

    if (!pricingTier) {
      throw new NotFoundException('Intervalo de preço não encontrada.');
    }

    if (pricingTier.getStatus() === SharedStatus.INACTIVE) {
      throw new BadRequestException('Intervalo de preço já está inativa.');
    }

    pricingTier.deactivate();
    await this.pricingTierRepository.save(pricingTier);
  }
}
