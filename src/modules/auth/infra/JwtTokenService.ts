import { JwtService } from '@nestjs/jwt';
import { TokenPayload, TokenService } from '../domain/TokenService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  generateOnboardingToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: '45min',
    });
  }
}
