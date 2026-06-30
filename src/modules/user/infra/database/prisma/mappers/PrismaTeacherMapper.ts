import {
  Teacher as PrismaTeacher,
  Subject as PrismaSubject,
  WeekDay as PrismaWeekDay,
  Zone as PrismaZone,
  GradeLevel as PrismaGradeLevel,
  TeacherPricingTier as PrismaTeacherPricingTier,
  User as PrismaUser,
  Prisma,
} from 'prisma/generated';

import { Teacher } from '@/modules/user/domain/teacher/Teacher';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { Zone } from '@/modules/bukis/domain/zone/Zone';

import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { TeacherProfileStatus } from '@/modules/user/domain/teacher/TeacherProfileStatus';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { TeacherPricingTier } from '@/modules/bukis/domain/teacher-pricing-tier/TeacherPricingTier';

export type PrismaTeacherWithRelations = PrismaTeacher & {
  subjects: PrismaSubject[];
  weekDays: PrismaWeekDay[];
  zones: PrismaZone[];
  gradeLevels: PrismaGradeLevel[];
  priceTier: PrismaTeacherPricingTier | null;
};

export class PrismaTeacherMapper {
  static toDomain(raw: PrismaTeacherWithRelations): Teacher {
    return Teacher.restore(
      raw.id,
      raw.userId,
      raw.avatar,
      raw.biUrl as string,
      raw.subjects.map((s) =>
        Subject.restore(s.id, s.name, s.status as SharedStatus),
      ),
      raw.weekDays.map((w) =>
        WeekDay.restore(w.id, w.name, w.status as SharedStatus),
      ),
      raw.zones.map((z) =>
        Zone.restore(z.id, z.name, z.status as SharedStatus),
      ),
      raw.gradeLevels.map((g) =>
        GradeLevel.restore(g.id, g.name, g.status as SharedStatus),
      ),
      raw.priceTier as TeacherPricingTier | null,
      raw.status as TeacherProfileStatus,
    );
  }

  static toPrisma(teacher: Teacher) {
    return {
      avatar: teacher.getAvatar(),
      biUrl: teacher.getBiUrl(),
      status: teacher.getStatus(),
      subjects: {
        set: teacher.getSubjects().map((s) => ({ id: s.getId() })),
      },
      weekDays: {
        set: teacher.getWeekDays().map((w) => ({ id: w.getId() })),
      },
      zones: {
        set: teacher.getLessonZones().map((z) => ({ id: z.getId() })),
      },
      gradeLevels: {
        set: teacher.getGradeLevels().map((g) => ({ id: g.getId() })),
      },
      priceTier: teacher.getPriceTier()
        ? { connect: { id: teacher.getPriceTier()!.getId() } }
        : { disconnect: true },
    };
  }

  static toCreatePrisma(teacher: Teacher) {
    return {
      id: teacher.getId(),
      avatar: teacher.getAvatar(),
      biUrl: teacher.getBiUrl(),
      status: teacher.getStatus(),
      subjects: {
        connect: teacher.getSubjects().map((s) => ({ id: s.getId() })),
      },
      weekDays: {
        connect: teacher.getWeekDays().map((w) => ({ id: w.getId() })),
      },
      zones: {
        connect: teacher.getLessonZones().map((z) => ({ id: z.getId() })),
      },
      gradeLevels: {
        connect: teacher.getGradeLevels().map((g) => ({ id: g.getId() })),
      },
      ...(teacher.getPriceTier()
        ? { priceTier: { connect: { id: teacher.getPriceTier()!.getId() } } }
        : {}),
      user: {
        connect: { id: teacher.getUserId() },
      },
    };
  }
}
