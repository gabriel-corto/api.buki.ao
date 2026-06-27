import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../domain/customer/CustomerRepository';

@Injectable()
export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute() {
    const customers = await this.customerRepository.findAll();
    return { customers };
  }
}
