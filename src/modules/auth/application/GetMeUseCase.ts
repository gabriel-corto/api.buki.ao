import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/shared/domain/user/UserRepository';

@Injectable()
export class GetMeUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return user;
  }
}
