import { Injectable } from '@nestjs/common';
import { BaseJwtGuard } from './base.guard';

@Injectable()
export class OnboardingGuard extends BaseJwtGuard {
  protected readonly expectedScope = 'onboarding' as const;
}
