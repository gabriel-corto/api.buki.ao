import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../domain/teacher/TeacherRepository';

@Injectable()
export class ListTeachersUseCase {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute() {
    const teachers = await this.teacherRepository.findAll();
    return { teachers };
  }
}
