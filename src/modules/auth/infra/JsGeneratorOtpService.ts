import { Injectable } from '@nestjs/common';
import { generate } from 'otp-generator';

import { OtpService } from '../domain/OtpService';

@Injectable()
export class JsGeneratorOtpService implements OtpService {
  generate(): string {
    return generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }
}
