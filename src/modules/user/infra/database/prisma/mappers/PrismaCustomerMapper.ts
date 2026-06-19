import { Customer } from '@/modules/user/domain/customer/Customer';
import { Customer as PrismaCustomer } from 'prisma/generated';

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaCustomer): Customer {
    return Customer.restore(raw.userId);
  }

  static toPrisma(customer: Customer): PrismaCustomer {
    return {
      id: customer.getUserId(),
      userId: customer.getUserId(),
    };
  }
}
