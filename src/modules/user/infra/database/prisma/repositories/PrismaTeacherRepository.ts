import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Teacher } from '@/modules/user/domain/teacher/Teacher';
import { PrismaTeacherMapper } from '../mappers/PrismaTeacherMapper';
import { TeacherRepository } from '@/modules/user/domain/teacher/TeacherRepository';

@Injectable()
export class PrismaTeacherRepository implements TeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(teacher: Teacher): Promise<void> {
    const existing = await this.prisma.teacher.findUnique({
      where: { userId: teacher.getUserId() },
    });

    if (existing) {
      await this.prisma.teacher.update({
        where: { userId: teacher.getUserId() },
        data: PrismaTeacherMapper.toPrisma(teacher),
      });
    } else {
      await this.prisma.teacher.create({
        data: PrismaTeacherMapper.toCreatePrisma(teacher),
      });
    }
  }

  async findAll(): Promise<Teacher[]> {
    const teachers = await this.prisma.teacher.findMany({
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        priceTier: true,
        user: true,
      },
    });

    return teachers.map((teacher) => PrismaTeacherMapper.toDomain(teacher));
  }

  async findById(id: string): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id },
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        priceTier: true,
      },
    });
    return teacher ? PrismaTeacherMapper.toDomain(teacher) : null;
  }

  async findByUserId(userId: string): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findFirst({
      where: { userId },
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        priceTier: true,
      },
    });
    return teacher ? PrismaTeacherMapper.toDomain(teacher) : null;
  }
}
