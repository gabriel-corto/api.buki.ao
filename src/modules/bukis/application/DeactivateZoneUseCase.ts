import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { Zone } from '../domain/zone/Zone';
import { ZoneRepository } from '../domain/zone/ZoneRepository';

@Injectable()
export class DeactivateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(id: string): Promise<Zone> {
    const zone = await this.zoneRepository.findById(id);

    if (!zone) {
      throw new Error('Zone not found');
    }

    if (zone.getStatus() === SharedStatus.INACTIVE) {
      throw new Error('Zone is already inactive');
    }

    zone.deactivate();
    return this.zoneRepository.save(zone);
  }
}
