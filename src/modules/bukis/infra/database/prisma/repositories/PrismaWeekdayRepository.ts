import { Injectable } from '@nestjs/common';
import { WeekDayRepository } from '@/modules/bukis/domain/weekday/WeekDayRepository';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';

import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { PrismaWeekdayMapper } from '../mappers/PrismaWeekdayMapper';

@Injectable()
export class PrismaWeekdayRepository implements WeekDayRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(weekday: WeekDay): Promise<void> {
    await this.prisma.weekDay.upsert({
      where: {
        id: weekday.getId(),
      },
      create: PrismaWeekdayMapper.toPrisma(weekday),
      update: PrismaWeekdayMapper.toPrisma(weekday),
    });
  }

  async findAll(): Promise<WeekDay[]> {
    const weekDays = await this.prisma.weekDay.findMany();
    return weekDays.map((weekday) => PrismaWeekdayMapper.toDomain(weekday));
  }

  async findById(id: string): Promise<WeekDay | null> {
    const weekday = await this.prisma.weekDay.findUnique({
      where: {
        id,
      },
    });
    return weekday ? PrismaWeekdayMapper.toDomain(weekday) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.weekDay.delete({
      where: {
        id,
      },
    });
  }
}
