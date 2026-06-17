import { Injectable } from '@nestjs/common';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';

import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { PrismaGradeLevelMapper } from '../mappers/PrismaGradeLevelMapper';

@Injectable()
export class PrismaGradeLevelRepository implements PrismaGradeLevelRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async save(gradeLevel: GradeLevel): Promise<void> {
    await this.prisma.gradeLevel.upsert({
      where: {
        id: gradeLevel.getId(),
      },
      create: PrismaGradeLevelMapper.toPrisma(gradeLevel),
      update: PrismaGradeLevelMapper.toPrisma(gradeLevel),
    });
  }
}
