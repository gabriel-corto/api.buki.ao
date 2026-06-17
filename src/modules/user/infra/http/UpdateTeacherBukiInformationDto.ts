import { IsArray } from 'class-validator';

export class UpdateTeacherBukiInformationDto {
  @IsArray()
  zones: string[];

  @IsArray()
  weekdays: string[];

  @IsArray()
  subjects: string[];

  @IsArray()
  gradeLevel: string[];
}
