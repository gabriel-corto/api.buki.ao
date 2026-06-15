import { UserAccountType } from '@/shared/domain/user/UserAccountType';
import { UserRole } from '@/shared/domain/user/UserRole';

export interface AccessTokenPayload {
  scope: 'access';
  id: string;
  phone: string;
  role: UserRole;
  accountType: UserAccountType | null;
}

export interface OnboardingTokenPayload {
  scope: 'onboarding';
  userId?: string | null;
  phone: string;
}

export type TokenPayload = AccessTokenPayload | OnboardingTokenPayload;

export abstract class TokenService {
  abstract generateAccessToken(payload: TokenPayload): string;
  abstract generateOnboardingToken(payload: TokenPayload): string;
}
