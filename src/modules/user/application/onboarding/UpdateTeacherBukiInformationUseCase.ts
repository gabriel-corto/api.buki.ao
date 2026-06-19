import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { TeacherRepository } from '../../domain/teacher/TeacherRepository';

import { ZoneRepository } from '@/modules/bukis/domain/zone/ZoneRepository';
import { SubjectRepository } from '@/modules/bukis/domain/subject/SubjectRepository';
import { WeekDayRepository } from '@/modules/bukis/domain/weekday/WeekDayRepository';
import { GradeLevelRepository } from '@/modules/bukis/domain/grade-level/GradeLevelRepository';

import { UpdateTeacherBukiInformationUseCaseInput } from './UpdateTeacherBukiInformationUseCaseInput';

@Injectable()
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

    const subjects = await Promise.all(
      input.subjects.map(async (subjectId) => {
        const subject = await this.subjectRepository.findById(subjectId);
        if (!subject) {
          throw new NotFoundException(
            `Disciplina não encontrada: ${subjectId}`,
          );
        }
        return subject;
      }),
    );

    const gradeLevels = await Promise.all(
      input.gradeLevel.map(async (levelId) => {
        const level = await this.gradeLevelRepository.findById(levelId);
        if (!level) {
          throw new NotFoundException(
            `Nível de ensino não encontrado: ${levelId}`,
          );
        }
        return level;
      }),
    );

    const weekDays = await Promise.all(
      input.weekdays.map(async (weekdayId) => {
        const weekday = await this.weekDayRepository.findById(weekdayId);
        if (!weekday) {
          throw new NotFoundException(
            `Dia da semana não encontrado: ${weekdayId}`,
          );
        }
        return weekday;
      }),
    );

    const zones = await Promise.all(
      input.zones.map(async (zoneId) => {
        const zone = await this.lessonZoneRepository.findById(zoneId);
        if (!zone) {
          throw new NotFoundException(`Zona não encontrada: ${zoneId}`);
        }
        return zone;
      }),
    );

    teacher.updateSubjects(subjects);
    teacher.updateGradeLevels(gradeLevels);
    teacher.updateWeekDays(weekDays);
    teacher.updateLessonZones(zones);

    await this.teacherRepository.save(teacher);
  }
}
