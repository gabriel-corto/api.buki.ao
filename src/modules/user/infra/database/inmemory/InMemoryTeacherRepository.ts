import { Injectable } from '@nestjs/common';

import { Teacher } from '@/modules/user/domain/teacher/Teacher';
import { TeacherRepository } from '@/modules/user/domain/teacher/TeacherRepository';

@Injectable()
export class InMemoryTeacherRepository implements TeacherRepository {
  private teachers: Teacher[] = [];

  async findByUserId(userId: string): Promise<Teacher | null> {
    await Promise.resolve();
    return (
      this.teachers.find((teacher) => teacher.getUserId() === userId) || null
    );
  }

  async save(teacher: Teacher): Promise<void> {
    await Promise.resolve();
    const index = this.teachers.findIndex(
      (t) => t.getUserId() === teacher.getUserId(),
    );
    if (index !== -1) {
      this.teachers[index] = teacher;
    } else {
      this.teachers.push(teacher);
    }
  }

  async findById(id: string): Promise<Teacher | null> {
    await Promise.resolve();
    return this.teachers.find((teacher) => teacher.getId() === id) || null;
  }

  async findAll(): Promise<Teacher[]> {
    await Promise.resolve();
    return this.teachers;
  }
}
