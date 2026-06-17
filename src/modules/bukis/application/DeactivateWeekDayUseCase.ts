import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';

@Injectable()
export class DeactivateWeekDayUseCase {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async execute(id: string) {
    const weekday = await this.weekdayRepository.findById(id);

    if (!weekday) {
      throw new NotFoundException('Dia da semana não encontrada.');
    }

    if (weekday.getStatus() === SharedStatus.INACTIVE) {
      throw new BadRequestException('Este Dia da semana já está inativa.');
    }

    weekday.deactivate();
    await this.weekdayRepository.save(weekday);
  }
}
