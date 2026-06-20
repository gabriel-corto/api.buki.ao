import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@/shared/decorators/public.decorator';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

import { RequestOtpUseCase } from '../application/RequestOtpUseCase';
import { VerifyOtpUseCase } from '../application/VerifyOtpUseCase';

import { RequestOtpDto } from './RequestOtpDto';
import { VerifyOtpDto } from './VerifyOtpDto';
import { GetMeUseCase } from '../application/GetMeUseCase';

import type {
  ApiDataResponse,
  ApiNoDataResponse,
} from '@/shared/types/ApiResponse';
import type { AccessTokenPayload } from '../domain/TokenService';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private requestOtp: RequestOtpUseCase,
    private verifyOtp: VerifyOtpUseCase,
    private getMeUseCase: GetMeUseCase,
  ) {}

  @Public()
  @Post('/request-otp')
  @ApiOperation({ summary: 'Request OTP code' })
  @ApiResponse({ status: 200, description: 'OTP code sent successfully' })
  async request(@Body() body: RequestOtpDto): Promise<ApiNoDataResponse> {
    await this.requestOtp.execute(body);

    return {
      message: 'Código OTP enviado com sucesso!',
      success: true,
    };
  }

  @Public()
  @Post('/verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiResponse({ status: 200, description: 'OTP code verified successfully' })
  async verify(@Body() body: VerifyOtpDto): Promise<ApiDataResponse> {
    const { hasUser, accessToken, onboardingToken } =
      await this.verifyOtp.execute(body);

    return {
      data: {
        hasUser,
        accessToken,
        onboardingToken,
      },
      success: true,
      message: 'Código OTP verificado com sucesso!',
    };
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  async getMe(
    @CurrentUser() user: AccessTokenPayload,
  ): Promise<ApiDataResponse> {
    const userProfile = await this.getMeUseCase.execute(user.id);

    return {
      data: {
        name: userProfile.getName(),
        phone: userProfile.getPhone().getValue(),
        email: userProfile.getEmail(),
        role: userProfile.getRole(),
        accountType: userProfile.getAccountType(),
        status: userProfile.getStatus(),
      },
      success: true,
    };
  }
}
