import { TokenPayload, TokenService } from '../domain/TokenService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeTokenService implements TokenService {
  generateAccessToken(payload: TokenPayload): string {
    return JSON.stringify(payload);
  }

  generateOnboardingToken(payload: TokenPayload): string {
    return JSON.stringify(payload);
  }
}
