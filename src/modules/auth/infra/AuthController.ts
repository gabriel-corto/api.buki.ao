import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/shared/decorators/public.decorator';

import { RequestOtpUseCase } from '../application/RequestOtpUseCase';
import { VerifyOtpUseCase } from '../application/VerifyOtpUseCase';

import { RequestOtpDto } from './RequestOtpDto';
import { VerifyOtpDto } from './VerifyOtpDto';

import type {
  ApiDataResponse,
  ApiNoDataResponse,
} from '@/shared/types/ApiResponse';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private requestOtp: RequestOtpUseCase,
    private verifyOtp: VerifyOtpUseCase,
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
}
