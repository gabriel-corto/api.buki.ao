import { Injectable } from '@nestjs/common';

import { WeekDay } from '../domain/weekday/WeekDay';
import { WeekDayName } from '../domain/weekday/WeekDayName';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';

@Injectable()
export class CreateWeekDayUseCase {
  constructor(private readonly weekDayRepository: WeekDayRepository) {}

  async execute(name: WeekDayName): Promise<WeekDay> {
    const weekDay = WeekDay.create(name);
    return this.weekDayRepository.create(weekDay);
  }
}
