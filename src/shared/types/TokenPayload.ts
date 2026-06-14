import { UserRole } from '../domain/user/UserRole';
import { UserAccountType } from '../domain/user/UserAccountType';

export interface AccessTokenPayload {
  scope: 'access';
  id: string;
  phone: string;
  role: UserRole;
  accountType: UserAccountType | null;
}

export interface OnboardingTokenPayload {
  scope: 'onboarding';
  phone: string;
}

export type TokenPayload = AccessTokenPayload | OnboardingTokenPayload;
