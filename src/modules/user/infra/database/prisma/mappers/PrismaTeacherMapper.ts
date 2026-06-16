import {
  Teacher as PrismaTeacher,
  Subject as PrismaSubject,
  WeekDay as PrismaWeekDay,
  Zone as PrismaZone,
  GradeLevel as PrismaGradeLevel,
  PricePolicy as PrismaPricePolicy,
} from 'prisma/generated';

import { Teacher } from '@/modules/user/domain/Teacher';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { PricePolicy } from '@/modules/bukis/domain/price/PricePolicy';
import { TeacherProfileStatus } from '@/modules/user/domain/TeacherProfileStatus';
import { SubjectName } from '@/modules/bukis/domain/subject/SubjectName';
import { WeekDayName } from '@/modules/bukis/domain/weekday/WeekDayName';
import { GradeLevelName } from '@/modules/bukis/domain/grade-level/GradeLevelName';
import { PriceTier } from '@/modules/bukis/domain/price/PriceTier';
import { SharedStatus } from '@/shared/domain/SharedStatus';

export type PrismaTeacherWithRelations = PrismaTeacher & {
  subjects: PrismaSubject[];
  weekDays: PrismaWeekDay[];
  zones: PrismaZone[];
  gradeLevels: PrismaGradeLevel[];
  pricePolicy: PrismaPricePolicy | null;
};

export class PrismaTeacherMapper {
  static toDomain(raw: PrismaTeacherWithRelations): Teacher {
    return Teacher.restore(
      raw.id,
      raw.userId,
      raw.avatar,
      raw.subjects.map((s) =>
        Subject.restore(s.id, s.name as SubjectName, s.status as SharedStatus),
      ),
      raw.weekDays.map((w) =>
        WeekDay.restore(w.id, w.name as WeekDayName, w.status as SharedStatus),
      ),
      raw.zones.map((z) =>
        Zone.restore(z.id, z.name, z.status as SharedStatus),
      ),
      raw.gradeLevels.map((g) =>
        GradeLevel.restore(
          g.id,
          g.name as GradeLevelName,
          g.status as SharedStatus,
        ),
      ),
      raw.pricePolicy
        ? PricePolicy.restore(
            raw.pricePolicy.id,
            raw.pricePolicy.value as PriceTier,
            raw.pricePolicy.status as SharedStatus,
          )
        : (null as any),
      raw.status as TeacherProfileStatus,
    );
  }

  static toPrisma(teacher: Teacher): any {
    return {
      id: teacher.getId(),
      userId: teacher.getUserId(),
      avatar: teacher.getAvatar(),
      status: teacher.getStatus(),
      pricePolicyId: teacher.getPricePolicy()?.getId(),
    };
  }
}
