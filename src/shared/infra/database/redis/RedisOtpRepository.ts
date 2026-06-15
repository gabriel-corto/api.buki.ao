import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { OtpRepository } from '@/modules/auth/domain/OtpRepository';

@Injectable()
export class RedisOtpRepository implements OtpRepository {
  constructor(private readonly redis: Redis) {}

  async save(phone: string, code: string): Promise<void> {
    await this.redis.set(phone, code, 'EX', 60 * 5);
  }

  async get(phone: string): Promise<string | null> {
    return this.redis.get(phone);
  }

  async delete(phone: string): Promise<void> {
    await this.redis.del(phone);
  }

  async incrementAttempts(phone: string): Promise<number> {
    return this.redis.incr(`attempts:${phone}`);
  }

  async setAttemptsTTL(phone: string, ttl: number): Promise<void> {
    await this.redis.expire(`attempts:${phone}`, ttl);
  }
}
