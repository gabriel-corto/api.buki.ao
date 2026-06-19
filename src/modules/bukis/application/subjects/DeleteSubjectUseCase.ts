import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectRepository } from '../../domain/subject/SubjectRepository';

@Injectable()
export class DeleteSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    await this.subjectRepository.delete(id);
  }
}
