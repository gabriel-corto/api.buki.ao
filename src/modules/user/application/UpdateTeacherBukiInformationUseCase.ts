import { NotAcceptableException } from '@nestjs/common';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { TeacherRepository } from '../domain/TeacherRepository';
import { UpdateTeacherBukiInformationUseCaseInput } from './UpdateTeacherBukiInformationUseCaseInput';

export class UpdateTeacherBukiInformationUseCase {
  constructor(
    private userRepository: UserRepository,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(input: UpdateTeacherBukiInformationUseCaseInput) {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotAcceptableException('Usuário não encontrado.');
    }

    const teacher = await this.teacherRepository.findByUserId(input.userId);
    if (!teacher) {
      throw new NotAcceptableException('Professor não encontrado.');
    }

    teacher.updateGradeLevels(input.gradeLevel);
    teacher.updateSubjects(input.subjects);
    teacher.updateWeekDays(input.weekdays);
    teacher.updateLessonZones(input.zones);

    await this.teacherRepository.save(teacher);
  }
}
