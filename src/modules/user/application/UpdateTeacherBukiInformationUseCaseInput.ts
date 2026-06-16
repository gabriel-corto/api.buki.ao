import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { Zone } from '@/modules/bukis/domain/zone/Zone';

export interface UpdateTeacherBukiInformationUseCaseInput {
  userId: string;
  zones: Zone[];
  weekdays: WeekDay[];
  subjects: Subject[];
  gradeLevel: GradeLevel[];
}
