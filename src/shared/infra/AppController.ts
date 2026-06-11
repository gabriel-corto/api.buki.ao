import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcome() {
    return {
      message: 'Welcome to api.buki.ao 🚀',
    };
  }
}
