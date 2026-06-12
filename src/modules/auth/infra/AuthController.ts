import { Body, Controller, Post } from '@nestjs/common';

import { RequestOtpUseCase } from '../application/RequestOtpUseCase';
import { RequestOtpDto } from './RequestOtpDto';

@Controller('/auth')
export class AuthController {
  constructor(private requestOtp: RequestOtpUseCase) {}

  @Post('/request-otp')
  async request(@Body() body: RequestOtpDto) {
    await this.requestOtp.execute(body);

    return {};
  }
}
