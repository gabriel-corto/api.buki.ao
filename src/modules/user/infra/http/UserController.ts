import { Body, Controller, Post } from '@nestjs/common';

import { StartOnBoardingUseCase } from '../../application/StartOnboardingUseCase';

import { StartOnBoardingDto } from './StartOnBoardingDto';

import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { type TokenPayload } from '@/shared/types/TokenPayload';
import { type ApiDataResponse } from '@/shared/types/ApiResponse';

@Controller('users')
export class UserController {
  constructor(
    private readonly startOnBoardingUseCase: StartOnBoardingUseCase,
  ) {}

  @Post('/profile/onboarding')
  async startOnBoarding(
    @CurrentUser() user: TokenPayload,
    @Body() body: StartOnBoardingDto,
  ): Promise<ApiDataResponse> {
    const { hasCompleted, accessToken, onboardingToken } =
      await this.startOnBoardingUseCase.execute({
        name: body.name,
        phone: user.phone,
        accountType: body.accountType,
      });

    return {
      data: {
        hasCompleted,
        accessToken,
        onboardingToken,
      },
      success: true,
      message: 'Conta configurada com sucesso!',
    };
  }
}
