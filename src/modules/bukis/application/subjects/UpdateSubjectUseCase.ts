import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectRepository } from '../../domain/subject/SubjectRepository';

@Injectable()
export class UpdateSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string, name: string) {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    subject.setName(name);
    await this.subjectRepository.save(subject);
  }
}
