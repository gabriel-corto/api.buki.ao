import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { ZoneRepository } from '../../domain/zone/ZoneRepository';

@Injectable()
export class DeactivateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(id: string) {
    const zone = await this.zoneRepository.findById(id);

    if (!zone) {
      throw new NotFoundException('Zona não encontrada');
    }

    if (zone.getStatus() === SharedStatus.INACTIVE) {
      throw new BadRequestException('Zona já está inativa1');
    }

    zone.deactivate();
    await this.zoneRepository.save(zone);
  }
}
