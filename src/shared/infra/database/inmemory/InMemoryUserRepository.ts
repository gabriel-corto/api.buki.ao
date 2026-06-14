import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/shared/domain/user/UserRepository';
import { User } from '@/shared/domain/user/User';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    await Promise.resolve();
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    await Promise.resolve();
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    await Promise.resolve();
    return this.users.find((user) => user.getId() === id) || null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    await Promise.resolve();
    return (
      this.users.find((user) => user.getPhone().getValue() === phone) || null
    );
  }
}
