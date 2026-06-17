import { Injectable } from '@nestjs/common';

import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { ZoneRepository } from '@/modules/bukis/domain/zone/ZoneRepository';

import { PrismaClient } from 'prisma/generated';
import { PrismaZoneMapper } from '../mappers/PrismaZoneMapper';

@Injectable()
export class PrismaZoneRepository implements ZoneRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(zone: Zone): Promise<void> {
    await this.prisma.zone.upsert({
      where: {
        id: zone.getId(),
      },
      create: PrismaZoneMapper.toPrisma(zone),
      update: PrismaZoneMapper.toPrisma(zone),
    });
  }

  async findAll(): Promise<Zone[]> {
    const zones = await this.prisma.zone.findMany();
    return zones.map((zone) => PrismaZoneMapper.toDomain(zone));
  }

  async findById(id: string): Promise<Zone | null> {
    const zone = await this.prisma.zone.findFirst({
      where: {
        id,
      },
    });
    return zone ? PrismaZoneMapper.toDomain(zone) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.zone.delete({
      where: { id },
    });
  }
}
