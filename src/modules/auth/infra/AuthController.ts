import { Body, Controller, Post } from '@nestjs/common';

import { RequestOtpUseCase } from '../application/RequestOtpUseCase';
import { VerifyOtpUseCase } from '../application/VerifyOtpUseCase';

import { RequestOtpDto } from './RequestOtpDto';
import { VerifyOtpDto } from './VerifyOtpDto';

import {
  ApiDataResponse,
  type ApiNoDataResponse,
} from '@/shared/types/ApiResponse';

@Controller('/auth')
export class AuthController {
  constructor(
    private requestOtp: RequestOtpUseCase,
    private verifyOtp: VerifyOtpUseCase,
  ) {}

  @Post('/request-otp')
  async request(@Body() body: RequestOtpDto): Promise<ApiNoDataResponse> {
    await this.requestOtp.execute(body);

    return {
      message: 'Código OTP enviado com sucesso!',
      success: true,
    };
  }

  @Post('/verify-otp')
  async verify(@Body() body: VerifyOtpDto): Promise<ApiDataResponse<string>> {
    const { hasUser, token } = await this.verifyOtp.execute(body);

    return {
      data: token || '',
      success: hasUser,
      message: 'Código OTP verificado com sucesso!',
    };
  }
}
