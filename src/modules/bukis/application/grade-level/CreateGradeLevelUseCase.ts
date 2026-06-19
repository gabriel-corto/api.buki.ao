import { Injectable } from '@nestjs/common';
import { GradeLevel } from '../../domain/grade-level/GradeLevel';
import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';

@Injectable()
export class CreateGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(name: string) {
    const gradeLevel = GradeLevel.create(name);
    await this.gradeLevelRepository.save(gradeLevel);
  }
}
