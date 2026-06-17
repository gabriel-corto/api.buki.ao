import { Prisma, Subject as PrismaSubject } from 'prisma/generated';

import { Subject } from '@/modules/bukis/domain/subject/Subject';

export class PrismaSubjectMapper {
  static toDomain(prismaSubject: PrismaSubject): Subject {
    return Subject.create(prismaSubject.name);
  }

  static toPrisma(subject: Subject): Prisma.SubjectCreateInput {
    return {
      id: subject.getId(),
      name: subject.getName(),
      status: subject.getStatus(),
    };
  }
}
