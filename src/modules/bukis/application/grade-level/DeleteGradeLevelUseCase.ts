import { Injectable, NotFoundException } from '@nestjs/common';

import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';

@Injectable()
export class DeleteGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(id: string) {
    const gradeLevel = await this.gradeLevelRepository.findById(id);

    if (!gradeLevel) {
      throw new NotFoundException('Nível de ensino não encontrado.');
    }

    await this.gradeLevelRepository.delete(id);
  }
}
