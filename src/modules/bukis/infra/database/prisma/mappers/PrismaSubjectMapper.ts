import { Prisma, Subject as PrismaSubject } from 'prisma/generated';

import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { SharedStatus } from '@/shared/domain/SharedStatus';

export class PrismaSubjectMapper {
  static toDomain(prismaSubject: PrismaSubject): Subject {
    return Subject.restore(
      prismaSubject.id,
      prismaSubject.name,
      prismaSubject.status as SharedStatus,
    );
  }

  static toPrisma(subject: Subject): Prisma.SubjectCreateInput {
    return {
      id: subject.getId(),
      name: subject.getName(),
      status: subject.getStatus(),
    };
  }
}
