import { Injectable } from '@nestjs/common';
import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';
import { GradeLevel } from '../../domain/grade-level/GradeLevel';

@Injectable()
export class GetGradeLevelsUseCase {
  constructor(private gradeLevelRepository: GradeLevelRepository) {}

  async execute(): Promise<GradeLevel[]> {
    const gradeLevels = await this.gradeLevelRepository.findAll();
    return gradeLevels;
  }
}
