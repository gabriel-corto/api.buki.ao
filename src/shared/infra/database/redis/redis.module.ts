import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: Redis,
      useFactory: (configService: ConfigService) => {
        return new Redis({
          port: configService.getOrThrow<number>('REDIS_PORT'),
          host: configService.getOrThrow<string>('REDIS_HOST'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [Redis],
})
export class RedisModule {}
