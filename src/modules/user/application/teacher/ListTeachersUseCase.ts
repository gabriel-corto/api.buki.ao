import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../domain/teacher/TeacherRepository';

@Injectable()
export class ListTeachersUseCase {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute() {
    const teachers = await this.teacherRepository.findAll();
    return teachers.map((teacher) => ({
      id: teacher.getId(),
      userId: teacher.getUserId(),
      avatar: teacher.getAvatar(),
      status: teacher.getStatus(),
    }));
  }
}
