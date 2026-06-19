import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBukiInformationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
