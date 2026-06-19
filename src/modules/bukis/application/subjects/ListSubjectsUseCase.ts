import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '../../domain/subject/SubjectRepository';

@Injectable()
export class ListSubjectsUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute() {
    const subjects = await this.subjectRepository.findAll();
    return subjects.map((subject) => ({
      id: subject.getId(),
      name: subject.getName(),
      status: subject.getStatus(),
    }));
  }
}
