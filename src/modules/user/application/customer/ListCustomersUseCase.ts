import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../domain/customer/CustomerRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';

@Injectable()
export class ListCustomersUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    const customers = await this.customerRepository.findAll();
    const users = await this.userRepository.findAll();

    const output = customers.map((customer) => {
      const user = users.find((user) => user.getId() === customer.getUserId());

      return {
        id: customer.getUserId(),
        name: user?.getName(),
        phone: user?.getPhone().getValue(),
        email: user?.getEmail(),
        status: user?.getStatus(),
      };
    });

    return { output };
  }
}
