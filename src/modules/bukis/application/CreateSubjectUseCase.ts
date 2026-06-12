import { Injectable } from '@nestjs/common';

import { Subject } from '../domain/subject/Subject';
import { SubjectName } from '../domain/subject/SubjectName';
import { SubjectRepository } from '../domain/subject/SubjectRepository';

@Injectable()
export class CreateSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(name: SubjectName): Promise<Subject> {
    const subject = Subject.create(name);
    return this.subjectRepository.save(subject);
  }
}
