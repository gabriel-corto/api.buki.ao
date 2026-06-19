import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeacherPricingTierDto {
  @IsString()
  @IsNotEmpty()
  pricingTier: string;
}
