import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateTeacherBukiInformationDto {
  @IsArray()
  @ApiProperty({ type: [String] })
  zones: string[];

  @IsArray()
  @ApiProperty({ type: [String] })
  weekdays: string[];

  @IsArray()
  @ApiProperty({ type: [String] })
  subjects: string[];

  @IsArray()
  @ApiProperty({ type: [String] })
  gradeLevel: string[];
}
