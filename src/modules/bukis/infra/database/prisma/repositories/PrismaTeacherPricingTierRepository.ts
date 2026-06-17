import { TeacherPricingTier } from '@/modules/bukis/domain/teacher-pricing-tier/TeacherPricingTier';
import { TeacherPricingTierRepository } from '@/modules/bukis/domain/teacher-pricing-tier/TeacherPricingTierRepository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaTeacherPricingTierMapper } from '../mappers/PrismaTeacherPricingTierMapper';

@Injectable()
export class PrismaTeacherPricingTierRepository implements TeacherPricingTierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(pricingTier: TeacherPricingTier): Promise<void> {
    await this.prisma.teacherPricingTier.upsert({
      where: {
        id: pricingTier.getId(),
      },
      create: PrismaTeacherPricingTierMapper.toPrisma(pricingTier),
      update: PrismaTeacherPricingTierMapper.toPrisma(pricingTier),
    });
  }

  async findById(id: string): Promise<TeacherPricingTier | null> {
    const pricingTier = await this.prisma.teacherPricingTier.findUnique({
      where: {
        id,
      },
    });
    return pricingTier
      ? PrismaTeacherPricingTierMapper.toDomain(pricingTier)
      : null;
  }

  async findAll(): Promise<TeacherPricingTier[]> {
    const pricingTiers = await this.prisma.teacherPricingTier.findMany();
    return pricingTiers.map((pricingTier) =>
      PrismaTeacherPricingTierMapper.toDomain(pricingTier),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.teacherPricingTier.delete({
      where: {
        id,
      },
    });
  }
}
