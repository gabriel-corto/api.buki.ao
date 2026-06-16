import { IsArray, IsEnum } from 'class-validator';

import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { Zone } from '@/modules/bukis/domain/zone/Zone';

export class UpdateTeacherBukiInformationDto {
  @IsArray()
  @IsEnum(Zone, { each: true })
  zones: Zone[];

  @IsArray()
  @IsEnum(WeekDay, { each: true })
  weekdays: WeekDay[];

  @IsArray()
  @IsEnum(Subject, { each: true })
  subjects: Subject[];

  @IsArray()
  @IsEnum(GradeLevel, { each: true })
  gradeLevel: GradeLevel[];
}
