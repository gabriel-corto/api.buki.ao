import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from '../../domain/teacher/TeacherRepository';

@Injectable()
export class ReproveTeacherUseCase {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(id: string): Promise<void> {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException('Professor não encontrado!');
    }

    teacher.reject();
    await this.teacherRepository.save(teacher);
  }
}
