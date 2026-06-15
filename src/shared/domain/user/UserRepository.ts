import { User } from './User';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByPhone(phone: string): Promise<User | null>;
}
