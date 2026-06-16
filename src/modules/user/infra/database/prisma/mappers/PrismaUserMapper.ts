import { User as PrismaUser } from 'prisma/generated';

import { Phone } from '@/shared/domain/user/Phone';
import { User } from '@/shared/domain/user/User';
import { UserRole } from '@/shared/domain/user/UserRole';
import { UserStatus } from '@/shared/domain/user/UserStatus';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.restore(
      raw.id,
      raw.name,
      Phone.create(raw.phone),
      raw.email,
      raw.role as UserRole,
      raw.accountType as UserAccountType,
      raw.status as UserStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.getId(),
      name: user.getName(),
      phone: user.getPhone().getValue(),
      email: user.getEmail(),
      role: user.getRole(),
      accountType: user.getAcountType(),
      status: user.getStatus(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
