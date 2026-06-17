import { NotFoundException } from '@nestjs/common';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { TeacherRepository } from '../domain/TeacherRepository';

import { GradeLevelRepository } from '@/modules/bukis/domain/grade-level/GradeLevelRepository';
import { SubjectRepository } from '@/modules/bukis/domain/subject/SubjectRepository';
import { WeekDayRepository } from '@/modules/bukis/domain/weekday/WeekDayRepository';
import { ZoneRepository } from '@/modules/bukis/domain/zone/ZoneRepository';

import { UpdateTeacherBukiInformationUseCaseInput } from './UpdateTeacherBukiInformationUseCaseInput';

export class UpdateTeacherBukiInformationUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly gradeLevelRepository: GradeLevelRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly weekDayRepository: WeekDayRepository,
    private readonly lessonZoneRepository: ZoneRepository,
  ) {}

  async execute(input: UpdateTeacherBukiInformationUseCaseInput) {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const teacher = await this.teacherRepository.findByUserId(input.userId);
    if (!teacher) {
      throw new NotFoundException('Professor não encontrado.');
    }

    input.subjects.forEach(async (subjectId) => {
      const subject = await this.subjectRepository.findById(subjectId);

      if (!subject) {
        throw new NotFoundException(`Disciplina não encontrada: ${subjectId}`);
      }

      teacher.updateSubjects([subject]);
    });

    input.gradeLevel.forEach(async (levelId) => {
      const level = await this.gradeLevelRepository.findById(levelId);

      if (!level) {
        throw new NotFoundException(
          `Nível de ensino não encontrado: ${levelId}`,
        );
      }

      teacher.updateGradeLevels([level]);
    });

    input.weekdays.forEach(async (weekdayId) => {
      const weekday = await this.weekDayRepository.findById(weekdayId);

      if (!weekday) {
        throw new NotFoundException(
          `Dia da semana não encontrado: ${weekdayId}`,
        );
      }

      teacher.updateWeekDays([weekday]);
    });

    input.zones.forEach(async (zoneId) => {
      const zone = await this.lessonZoneRepository.findById(zoneId);

      if (!zone) {
        throw new NotFoundException(`Zona não encontrada: ${zoneId}`);
      }

      teacher.updateLessonZones([zone]);
    });

    await this.teacherRepository.save(teacher);
  }
}
