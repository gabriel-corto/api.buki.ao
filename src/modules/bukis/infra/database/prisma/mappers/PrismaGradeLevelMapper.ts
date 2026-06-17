import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { Prisma, GradeLevel as PrismaGradeLevel } from 'prisma/generated';

export class PrismaGradeLevelMapper {
  static toDomain(prismaGradeLevel: PrismaGradeLevel): GradeLevel {
    return GradeLevel.restore(
      prismaGradeLevel.id,
      prismaGradeLevel.name,
      prismaGradeLevel.status as SharedStatus,
    );
  }

  static toPrisma(gradeLevel: GradeLevel): Prisma.GradeLevelCreateInput {
    return {
      id: gradeLevel.getId(),
      name: gradeLevel.getName(),
      status: gradeLevel.getStatus(),
    };
  }
}
