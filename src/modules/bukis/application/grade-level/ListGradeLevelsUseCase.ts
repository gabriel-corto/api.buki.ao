import { Injectable } from '@nestjs/common';
import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';

@Injectable()
export class ListGradeLevelsUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute() {
    const gradeLevels = await this.gradeLevelRepository.findAll();
    return gradeLevels.map((gradeLevel) => ({
      id: gradeLevel.getId(),
      name: gradeLevel.getName(),
      status: gradeLevel.getStatus(),
    }));
  }
}
