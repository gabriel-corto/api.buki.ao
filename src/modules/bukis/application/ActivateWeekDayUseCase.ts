import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { WeekDay } from '../domain/weekday/WeekDay';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';

@Injectable()
export class ActivateWeekDayUseCase {
  constructor(private readonly weekDayRepository: WeekDayRepository) {}

  async execute(id: string): Promise<WeekDay> {
    const weekDay = await this.weekDayRepository.findById(id);

    if (!weekDay) {
      throw new Error('WeekDay not found');
    }

    if (weekDay.getStatus() === SharedStatus.ACTIVE) {
      throw new Error('WeekDay is already active');
    }

    weekDay.activate();
    return this.weekDayRepository.save(weekDay);
  }
}
