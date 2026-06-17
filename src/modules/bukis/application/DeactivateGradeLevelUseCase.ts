import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { GradeLevelRepository } from '../domain/grade-level/GradeLevelRepository';

@Injectable()
export class DeactivateGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(id: string) {
    const gradeLevel = await this.gradeLevelRepository.findById(id);

    if (!gradeLevel) {
      throw new NotFoundException('Nível de ensino não encontrado');
    }

    if (gradeLevel.getStatus() === SharedStatus.INACTIVE) {
      throw new BadRequestException('Nível de ensino já está inativo');
    }

    gradeLevel.deactivate();
    await this.gradeLevelRepository.save(gradeLevel);
  }
}
