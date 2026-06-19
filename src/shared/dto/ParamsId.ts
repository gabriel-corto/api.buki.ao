import { IsString } from 'class-validator';

export class ParamsId {
  @IsString()
  id: string;
}
