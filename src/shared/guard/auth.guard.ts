import { Injectable } from '@nestjs/common';
import { BaseJwtGuard } from './base.guard';

@Injectable()
export class AuthGuard extends BaseJwtGuard {
  protected readonly expectedScope = 'access' as const;
}
