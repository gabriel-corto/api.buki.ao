import { UserAccountType } from '@/shared/domain/user/UserAccountType';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class StartOnBoardingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserAccountType)
  @IsNotEmpty()
  accountType: UserAccountType;
}
