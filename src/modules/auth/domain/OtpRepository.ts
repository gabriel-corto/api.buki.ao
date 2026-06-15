export abstract class OtpRepository {
  abstract save(key: string, value: string): Promise<void>;
  abstract get(key: string): Promise<string | null>;
  abstract delete(key: string): Promise<void>;
  abstract incrementAttempts(key: string): Promise<number>;
  abstract setAttemptsTTL(key: string, seconds: number): Promise<void>;
}
