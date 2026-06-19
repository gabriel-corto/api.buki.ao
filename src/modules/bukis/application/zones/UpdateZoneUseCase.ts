import { Injectable, NotFoundException } from '@nestjs/common';

import { ZoneRepository } from '../../domain/zone/ZoneRepository';

@Injectable()
export class UpdateZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(id: string, name: string) {
    const zone = await this.zoneRepository.findById(id);

    if (!zone) {
      throw new NotFoundException('Zona de aula não encontrada.');
    }

    zone.setName(name);
    await this.zoneRepository.save(zone);
  }
}
