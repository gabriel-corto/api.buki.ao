import { UserRole } from '../domain/user/UserRole';

export interface AuthTokenPayload {
  id: string;
  phone: string;
  role: UserRole;
}
