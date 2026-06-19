import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { GradeLevelRepository } from '../../domain/grade-level/GradeLevelRepository';

@Injectable()
export class ActivateGradeLevelUseCase {
  constructor(private readonly gradeLevelRepository: GradeLevelRepository) {}

  async execute(id: string) {
    const gradeLevel = await this.gradeLevelRepository.findById(id);

    if (!gradeLevel) {
      throw new NotFoundException('Nível de Ensino não encontrado');
    }

    if (gradeLevel.getStatus() === SharedStatus.ACTIVE) {
      throw new BadRequestException('Nível de Ensino já está ativo');
    }

    gradeLevel.activate();
    await this.gradeLevelRepository.save(gradeLevel);
  }
}
