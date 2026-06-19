import { Injectable } from '@nestjs/common';
import { Subject } from '../../domain/subject/Subject';
import { SubjectRepository } from '../../domain/subject/SubjectRepository';

@Injectable()
export class CreateSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(name: string) {
    const subject = Subject.create(name);
    await this.subjectRepository.save(subject);
  }
}
