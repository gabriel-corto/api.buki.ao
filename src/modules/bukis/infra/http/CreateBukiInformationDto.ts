import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBukiInformationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
