import { Injectable } from '@nestjs/common';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';
import { WeekDay } from '../domain/weekday/WeekDay';

@Injectable()
export class CreateWeekdayUseCase {
  constructor(private readonly weekdayRepository: WeekDayRepository) {}

  async execute(name: string) {
    const weekday = WeekDay.create(name);
    await this.weekdayRepository.save(weekday);
  }
}
