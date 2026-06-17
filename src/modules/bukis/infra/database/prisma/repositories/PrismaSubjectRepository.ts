import { Injectable } from '@nestjs/common';

import { SubjectRepository } from '@/modules/bukis/domain/subject/SubjectRepository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { PrismaSubjectMapper } from '../mappers/PrismaSubjectMapper';

@Injectable()
export class PrismaSubjectRepository implements SubjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(subject: Subject): Promise<void> {
    await this.prisma.subject.upsert({
      where: { id: subject.getId() },
      create: PrismaSubjectMapper.toPrisma(subject),
      update: PrismaSubjectMapper.toPrisma(subject),
    });
  }

  async findAll(): Promise<Subject[]> {
    const subjects = await this.prisma.subject.findMany();
    return subjects.map((subject) => PrismaSubjectMapper.toDomain(subject));
  }
  async findById(id: string): Promise<Subject | null> {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    return subject ? PrismaSubjectMapper.toDomain(subject) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subject.delete({ where: { id } });
  }
}
