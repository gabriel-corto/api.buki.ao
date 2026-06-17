import { Injectable } from '@nestjs/common';

import { Customer } from '@/modules/user/domain/Customer';
import { CustomerRepository } from '@/modules/user/domain/CustomerRepository';

import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';

import { PrismaCustomerMapper } from '../mappers/PrismaCustomerMapper';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(customer: Customer): Promise<void> {
    await this.prisma.customer.upsert({
      where: {
        userId: customer.getUserId(),
      },
      update: PrismaCustomerMapper.toPrisma(customer),
      create: PrismaCustomerMapper.toPrisma(customer),
    });
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { userId },
    });
    return customer ? PrismaCustomerMapper.toDomain(customer) : null;
  }
}
