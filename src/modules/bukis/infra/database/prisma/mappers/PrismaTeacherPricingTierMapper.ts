import { TeacherPricingTier } from '@/modules/bukis/domain/teacher-pricing-tier/TeacherPricingTier';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { TeacherPricingTier as PrismaTeacherPricingTier } from 'prisma/generated';

export class PrismaTeacherPricingTierMapper {
  static toDomain(pricingTier: PrismaTeacherPricingTier): TeacherPricingTier {
    return TeacherPricingTier.restore(
      pricingTier.id,
      pricingTier.value,
      pricingTier.status as SharedStatus,
    );
  }

  static toPrisma(
    teacherPricingTier: TeacherPricingTier,
  ): PrismaTeacherPricingTier {
    return {
      id: teacherPricingTier.getId(),
      value: teacherPricingTier.getValue(),
      status: teacherPricingTier.getStatus(),
    };
  }
}
