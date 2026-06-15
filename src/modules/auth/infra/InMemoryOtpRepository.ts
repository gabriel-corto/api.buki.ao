import { OtpRepository } from '../domain/OtpRepository';

export class InMemoryOtpRepository implements OtpRepository {
  private otpStore: Map<string, string> = new Map();

  async save(key: string, value: string): Promise<void> {
    await Promise.resolve();
    this.otpStore.set(key, value);
  }

  async findByOtp(value: string): Promise<string | null> {
    await Promise.resolve();
    return this.otpStore.get(value) || null;
  }

  async delete(key: string): Promise<void> {
    await Promise.resolve();
    this.otpStore.delete(key);
  }

  async get(key: string): Promise<string | null> {
    await Promise.resolve();
    return this.otpStore.get(key) || null;
  }

  async incrementAttempts(key: string): Promise<number> {
    await Promise.resolve();
    const currentAttempts = this.otpStore.get(key);
    if (currentAttempts) {
      this.otpStore.set(key, (parseInt(currentAttempts) + 1).toString());
    }
    return parseInt(currentAttempts || '0');
  }

  async setAttemptsTTL(key: string, ttl: number): Promise<void> {
    await Promise.resolve();
    setTimeout(() => {
      this.otpStore.delete(key);
    }, ttl);
  }
}
