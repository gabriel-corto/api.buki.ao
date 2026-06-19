import { Injectable } from '@nestjs/common';
import { ZoneRepository } from '../../domain/zone/ZoneRepository';

@Injectable()
export class ListZonesUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute() {
    const zones = await this.zoneRepository.findAll();
    return zones.map((zone) => ({
      id: zone.getId(),
      name: zone.getName(),
      status: zone.getStatus(),
    }));
  }
}
