import { Injectable, NotFoundException } from '@nestjs/common';

import { ZoneRepository } from '../../domain/zone/ZoneRepository';

@Injectable()
export class DeleteZoneUseCase {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  async execute(id: string) {
    const zone = await this.zoneRepository.findById(id);

    if (!zone) {
      throw new NotFoundException('Zona de aula não encontrada.');
    }

    await this.zoneRepository.delete(id);
  }
}
