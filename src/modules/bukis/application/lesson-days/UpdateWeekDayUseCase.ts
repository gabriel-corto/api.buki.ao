import { Injectable, NotFoundException } from '@nestjs/common';

import { WeekDayRepository } from '../../domain/weekday/WeekDayRepository';

@Injectable()
export class UpdateWeekDayUseCase {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async execute(id: string, name: string) {
    const weekday = await this.weekdayRepository.findById(id);

    if (!weekday) {
      throw new NotFoundException('Dia de aula não encontrado.');
    }

    weekday.setName(name);
    await this.weekdayRepository.save(weekday);
  }
}
