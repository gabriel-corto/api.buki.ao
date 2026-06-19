import { UserAccountType } from '@/shared/domain/user/UserAccountType';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class StartOnBoardingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Gabriel Francisco' })
  name: string;

  @IsEnum(UserAccountType)
  @IsNotEmpty()
  @ApiProperty({ enum: UserAccountType, example: UserAccountType.TEACHER })
  accountType: UserAccountType;
}
