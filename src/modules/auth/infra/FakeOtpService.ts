import { Injectable } from '@nestjs/common';
import { OtpService } from '../domain/OtpService';

@Injectable()
export class FakeOtpService implements OtpService {
  constructor(private readonly code: string) {}

  generate(): string {
    return this.code;
  }
}
