import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseJwtGuard } from './base.guard';
import { SKIP_AUTH_KEY } from '../decorators/skip-auth.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard extends BaseJwtGuard {
  protected readonly expectedScope = 'access' as const;

  constructor(jwtService: JwtService, reflector: Reflector) {
    super(jwtService, reflector);
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    return super.canActivate(context);
  }
}
