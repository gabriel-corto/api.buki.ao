import { Injectable } from '@nestjs/common';

import { Customer } from '@/modules/user/domain/Customer';
import { CustomerRepository } from '@/modules/user/domain/CustomerRepository';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async save(customer: Customer): Promise<void> {
    await Promise.resolve();
    this.customers.push(customer);
  }
}
