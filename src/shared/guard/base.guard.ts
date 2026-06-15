import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { TokenPayload } from '@/modules/auth/domain/TokenService';

@Injectable()
export abstract class BaseJwtGuard implements CanActivate {
  protected abstract readonly expectedScope: TokenPayload['scope'];

  constructor(
    protected jwtService: JwtService,
    protected reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }
    try {
      const payload: TokenPayload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (payload.scope !== this.expectedScope) {
        throw new UnauthorizedException('Token inválido para esta operação.');
      }

      request['user'] = payload;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.error('JWT Verification Error:', err);
      throw new UnauthorizedException('Token inválido.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
