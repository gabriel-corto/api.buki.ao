import { generate } from 'otp-generator';

export function generateOTPCode() {
  return generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
