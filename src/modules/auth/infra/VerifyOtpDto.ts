import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '912345678' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  code: string;
}
