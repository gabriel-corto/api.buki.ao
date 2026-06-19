import { Injectable } from '@nestjs/common';
import { WeekDayRepository } from '../../domain/weekday/WeekDayRepository';

@Injectable()
export class ListWeekDaysUseCase {
  constructor(private readonly weekDayRepository: WeekDayRepository) {}

  async execute() {
    const weekDays = await this.weekDayRepository.findAll();
    return weekDays.map((weekDay) => ({
      id: weekDay.getId(),
      name: weekDay.getName(),
      status: weekDay.getStatus(),
    }));
  }
}
