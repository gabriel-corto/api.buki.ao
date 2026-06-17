import {
  Teacher as PrismaTeacher,
  Subject as PrismaSubject,
  WeekDay as PrismaWeekDay,
  Zone as PrismaZone,
  GradeLevel as PrismaGradeLevel,
  Prisma,
} from 'prisma/generated';

import { Teacher } from '@/modules/user/domain/Teacher';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { TeacherProfileStatus } from '@/modules/user/domain/TeacherProfileStatus';
import { SubjectName } from '@/modules/bukis/domain/subject/SubjectName';
import { WeekDayName } from '@/modules/bukis/domain/weekday/WeekDayName';
import { GradeLevelName } from '@/modules/bukis/domain/grade-level/GradeLevelName';
import { PriceTier } from '@/modules/bukis/domain/PriceTier';
import { SharedStatus } from '@/shared/domain/SharedStatus';

export type PrismaTeacherWithRelations = PrismaTeacher & {
  subjects: PrismaSubject[];
  weekDays: PrismaWeekDay[];
  zones: PrismaZone[];
  gradeLevels: PrismaGradeLevel[];
};

export class PrismaTeacherMapper {
  static toDomain(raw: PrismaTeacherWithRelations): Teacher {
    return Teacher.restore(
      raw.id,
      raw.userId,
      raw.avatar,
      raw.biUrl as string,
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
      raw.priceTier as PriceTier,
      raw.status as TeacherProfileStatus,
    );
  }

  static toPrisma(teacher: Teacher): Prisma.TeacherCreateInput {
    return {
      id: teacher.getId(),
      avatar: teacher.getAvatar(),
      biUrl: teacher.getBiUrl(),
      status: teacher.getStatus(),
      priceTier: teacher.getPriceTier() as PriceTier,
      user: {
        connect: {
          id: teacher.getUserId(),
        },
      },
    };
  }
}
