import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { Subject } from '../domain/subject/Subject';
import { SubjectRepository } from '../domain/subject/SubjectRepository';

@Injectable()
export class ActivateSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new Error('Subject not found');
    }

    if (subject.getStatus() === SharedStatus.ACTIVE) {
      throw new Error('Subject is already active');
    }

    subject.activate();
    return this.subjectRepository.save(subject);
  }
}
