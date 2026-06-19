import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBukiInformationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
