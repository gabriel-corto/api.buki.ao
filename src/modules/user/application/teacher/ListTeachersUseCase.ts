import { Injectable } from '@nestjs/common';
import { TeacherRepository } from '../../domain/teacher/TeacherRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';

@Injectable()
export class ListTeachersUseCase {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    const teachers = await this.teacherRepository.findAll();
    const users = await this.userRepository.findAll();

    const output = teachers.map((teacher) => {
      const user = users.find((u) => u.getId() === teacher.getUserId());

      return {
        id: teacher.getId(),
        name: user?.getName() ?? '',
        avatar: teacher.getAvatar(),
        biUrl: teacher.getBiUrl(),
        status: teacher.getStatus(),
        subjects: teacher.getSubjects(),
        weekDays: teacher.getWeekDays(),
        lessonZones: teacher.getLessonZones(),
        gradeLevels: teacher.getGradeLevels(),
        phone: user?.getPhone().getValue() ?? '',
        email: user?.getEmail() ?? '',
        priceTier: teacher.getPriceTier(),
      };
    });

    return { output };
  }
}
