import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { OtpRepository } from '@/modules/auth/domain/OtpRepository';

@Injectable()
export class RedisOtpRepository implements OtpRepository {
  constructor(private readonly redis: Redis) {}

  async save(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 5);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async incrementAttempts(key: string): Promise<number> {
    return this.redis.incr(`attempts:${key}`);
  }

  async setAttemptsTTL(phone: string, ttl: number): Promise<void> {
    await this.redis.expire(`attempts:${phone}`, ttl);
  }
}
