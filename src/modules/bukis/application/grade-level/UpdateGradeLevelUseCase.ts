import { Injectable, NotFoundException } from '@nestjs/common';

import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';

@Injectable()
export class UpdateGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(id: string, name: string) {
    const gradeLevel = await this.gradeLevelRepository.findById(id);

    if (!gradeLevel) {
      throw new NotFoundException('Nível de ensino não encontrado.');
    }

    gradeLevel.setName(name);
    await this.gradeLevelRepository.save(gradeLevel);
  }
}
