import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { Prisma, Zone as PrismaZone } from 'prisma/generated';

export class PrismaZoneMapper {
  static toDomain(zone: PrismaZone): Zone {
    return Zone.restore(zone.id, zone.name, zone.status as SharedStatus);
  }

  static toPrisma(zone: Zone): Prisma.ZoneCreateInput {
    return {
      id: zone.getId(),
      name: zone.getName(),
      status: zone.getStatus(),
    };
  }
}
