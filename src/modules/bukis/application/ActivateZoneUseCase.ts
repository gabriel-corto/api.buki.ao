import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { ZoneRepository } from '../domain/zone/ZoneRepository';

@Injectable()
export class ActivateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(id: string) {
    const zone = await this.zoneRepository.findById(id);

    if (!zone) {
      throw new NotFoundException('Zona não encontrada.');
    }

    if (zone.getStatus() === SharedStatus.ACTIVE) {
      throw new BadRequestException('Zona já está ativa.');
    }

    zone.activate();
    await this.zoneRepository.save(zone);
  }
}
