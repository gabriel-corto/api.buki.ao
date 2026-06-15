import { Customer } from './Customer';

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
}
