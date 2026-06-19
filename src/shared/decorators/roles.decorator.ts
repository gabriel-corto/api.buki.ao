import { SetMetadata } from '@nestjs/common';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserAccountType[]) =>
  SetMetadata(ROLES_KEY, roles);
