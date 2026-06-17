import { TeacherPricingTier } from './TeacherPricingTier';

export abstract class TeacherPricingTierRepository {
  abstract findById(id: string): Promise<TeacherPricingTier | null>;
  abstract findAll(): Promise<TeacherPricingTier[]>;
  abstract save(pricingTier: TeacherPricingTier): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
