import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedStatus } from '@/shared/domain/SharedStatus';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';

@Injectable()
export class ActivateWeekDayUseCase {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async execute(id: string) {
    const weekday = await this.weekdayRepository.findById(id);

    if (!weekday) {
      throw new NotFoundException('Dia de aula não encontrada.');
    }

    if (weekday.getStatus() === SharedStatus.ACTIVE) {
      throw new BadRequestException('Este Dia de aula já está ativa.');
    }

    weekday.activate();
    await this.weekdayRepository.save(weekday);
  }
}
