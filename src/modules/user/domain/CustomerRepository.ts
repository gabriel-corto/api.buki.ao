import { Customer } from './Customer';

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract findByUserId(userId: string): Promise<Customer | null>;
}
