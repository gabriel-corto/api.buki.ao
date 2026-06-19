import { Injectable, NotFoundException } from '@nestjs/common';

import { WeekDayRepository } from '../../domain/weekday/WeekDayRepository';

@Injectable()
export class DeleteWeekDayUseCase {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async execute(id: string) {
    const weekday = await this.weekdayRepository.findById(id);

    if (!weekday) {
      throw new NotFoundException('Dia de aula não encontrado.');
    }

    await this.weekdayRepository.delete(id);
  }
}
