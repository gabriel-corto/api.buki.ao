import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';

import { User } from '@/shared/domain/user/User';
import { UserRepository } from '@/shared/domain/user/UserRepository';

import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        id: user.getId(),
      },
      update: PrismaUserMapper.toPrisma(user),
      create: PrismaUserMapper.toPrisma(user),
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { phone },
    });
    return user ? PrismaUserMapper.toDomain(user) : null;
  }
}
