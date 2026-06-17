import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { Prisma, WeekDay as PrismaWeekday } from 'prisma/generated';

export class PrismaWeekdayMapper {
  static toDomain(prismaWeekday: PrismaWeekday): WeekDay {
    return WeekDay.restore(
      prismaWeekday.id,
      prismaWeekday.name,
      prismaWeekday.status as SharedStatus,
    );
  }

  static toPrisma(weekday: WeekDay): Prisma.WeekDayCreateInput {
    return {
      id: weekday.getId(),
      name: weekday.getName(),
      status: weekday.getStatus(),
    };
  }
}
