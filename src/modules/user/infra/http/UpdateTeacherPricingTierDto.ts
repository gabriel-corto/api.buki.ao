import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeacherPricingTierDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pricingTierId: string;
}
