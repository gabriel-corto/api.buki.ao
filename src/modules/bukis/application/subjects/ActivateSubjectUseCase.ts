import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { SubjectRepository } from '../../domain/subject/SubjectRepository';

@Injectable()
export class ActivateSubjectUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    if (subject.getStatus() === SharedStatus.ACTIVE) {
      throw new BadRequestException('Disciplina já está ativa.');
    }

    subject.activate();
    await this.subjectRepository.save(subject);
  }
}
