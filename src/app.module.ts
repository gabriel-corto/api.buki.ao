import { Module } from '@nestjs/common';
import { AppController } from './shared/infra/AppController';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
