import { Injectable } from '@nestjs/common';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';

import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { PrismaGradeLevelMapper } from '../mappers/PrismaGradeLevelMapper';
import { GradeLevelRepository } from '@/modules/bukis/domain/grade-level/GradeLevelRepository';

@Injectable()
export class PrismaGradeLevelRepository implements GradeLevelRepository {
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

  async findById(id: string): Promise<GradeLevel | null> {
    const level = await this.prisma.gradeLevel.findFirst({
      where: { id },
    });
    return level ? PrismaGradeLevelMapper.toDomain(level) : null;
  }

  async findAll(): Promise<GradeLevel[]> {
    const levels = await this.prisma.gradeLevel.findMany();
    return levels.map((level) => PrismaGradeLevelMapper.toDomain(level));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.gradeLevel.delete({
      where: { id },
    });
  }
}
