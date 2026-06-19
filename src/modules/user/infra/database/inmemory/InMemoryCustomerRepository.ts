import { Injectable } from '@nestjs/common';

import { Customer } from '@/modules/user/domain/customer/Customer';
import { CustomerRepository } from '@/modules/user/domain/customer/CustomerRepository';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async findByUserId(userId: string): Promise<Customer | null> {
    await Promise.resolve();
    return (
      this.customers.find((customer) => customer.getUserId() === userId) || null
    );
  }

  async save(customer: Customer): Promise<void> {
    await Promise.resolve();
    const index = this.customers.findIndex(
      (c) => c.getUserId() === customer.getUserId(),
    );
    if (index !== -1) {
      this.customers[index] = customer;
    }
  }
}
