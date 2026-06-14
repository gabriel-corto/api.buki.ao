import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { GradeLevel } from '../domain/grade-level/GradeLevel';
import { GradeLevelRepository } from '../domain/grade-level/GradeLevelRepository';

@Injectable()
export class DeactivateGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(id: string): Promise<GradeLevel> {
    const gradeLevel = await this.gradeLevelRepository.findById(id);

    if (!gradeLevel) {
      throw new Error('GradeLevel not found');
    }

    if (gradeLevel.getStatus() === SharedStatus.INACTIVE) {
      throw new Error('GradeLevel is already inactive');
    }

    gradeLevel.deactivate();
    return this.gradeLevelRepository.save(gradeLevel);
  }
}
