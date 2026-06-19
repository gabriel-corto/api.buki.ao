import { Injectable } from '@nestjs/common';
import { Zone } from '../../domain/zone/Zone';
import { ZoneRepository } from '../../domain/zone/ZoneRepository';

@Injectable()
export class CreateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(name: string) {
    const zone = Zone.create(name);
    await this.zoneRepository.save(zone);
  }
}
