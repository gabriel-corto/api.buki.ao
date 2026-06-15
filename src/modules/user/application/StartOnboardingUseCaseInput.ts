import { UserAccountType } from '@/shared/domain/user/UserAccountType';

export interface StartOnboardingUseCaseInput {
  name: string;
  phone: string;
  accountType: UserAccountType;
}
