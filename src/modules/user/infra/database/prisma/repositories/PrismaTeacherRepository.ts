import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Teacher } from '@/modules/user/domain/Teacher';
import { TeacherRepository } from '@/modules/user/domain/TeacherRepository';
import { PrismaTeacherMapper } from '../mappers/PrismaTeacherMapper';

@Injectable()
export class PrismaTeacherRepository implements TeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(teacher: Teacher): Promise<void> {
    await this.prisma.teacher.create({
      data: PrismaTeacherMapper.toPrisma(teacher),
    });
  }

  async findAll(): Promise<Teacher[]> {
    const teachers = await this.prisma.teacher.findMany({
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        pricePolicy: true,
      },
    });
    return teachers.map((teacher) => PrismaTeacherMapper.toDomain(teacher));
  }

  async findById(id: string): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        pricePolicy: true,
      },
    });
    return teacher ? PrismaTeacherMapper.toDomain(teacher) : null;
  }

  async findByUserId(userId: string): Promise<Teacher | null> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { userId },
      include: {
        subjects: true,
        weekDays: true,
        zones: true,
        gradeLevels: true,
        pricePolicy: true,
      },
    });
    return teacher ? PrismaTeacherMapper.toDomain(teacher) : null;
  }
}
