import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@/shared/domain/user/UserRole';
import { UserStatus } from '@/shared/domain/user/UserStatus';
import { PrismaService } from './database/prisma/prisma.service';
import { UserAccountType } from '../domain/user/UserAccountType';

@Injectable()
export class GenerateManager implements OnModuleInit {
  private readonly logger = new Logger(GenerateManager.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    const phone = this.configService.getOrThrow<string>('MANAGER_PHONE');
    const name = this.configService.getOrThrow<string>('MANAGER_NAME');
    const email = this.configService.get<string>('MANAGER_EMAIL');

    const admin = await this.prisma.user.upsert({
      where: { phone },
      update: {},
      create: {
        id: `MANAGER-${Date.now()}`,
        name,
        phone,
        email: email ?? null,
        role: UserRole.MANAGER,
        accountType: UserAccountType.MANAGER,
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    this.logger.log(`Buki Manager: ${admin.id}`);
    console.log(`Buki Manager: ${admin.id}`);
  }
}
