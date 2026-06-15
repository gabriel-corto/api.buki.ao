import { Injectable } from '@nestjs/common';

import { Teacher } from '@/modules/user/domain/Teacher';
import { TeacherRepository } from '@/modules/user/domain/TeacherRepository';

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
}
