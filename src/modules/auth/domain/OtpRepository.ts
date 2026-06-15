export abstract class OtpRepository {
  abstract save(phone: string, code: string): Promise<void>;
  abstract get(phone: string): Promise<string | null>;
  abstract delete(phone: string): Promise<void>;
  abstract incrementAttempts(phone: string): Promise<number>;
  abstract setAttemptsTTL(phone: string, seconds: number): Promise<void>;
}
