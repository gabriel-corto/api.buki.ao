import { Injectable } from '@nestjs/common';

import { SharedStatus } from '@/shared/domain/SharedStatus';

import { WeekDay } from '../domain/weekday/WeekDay';
import { WeekDayRepository } from '../domain/weekday/WeekDayRepository';

@Injectable()
export class DeactivateWeekDayUseCase {
  constructor(private readonly weekDayRepository: WeekDayRepository) {}

  async execute(id: string): Promise<WeekDay> {
    const weekDay = await this.weekDayRepository.findById(id);

    if (!weekDay) {
      throw new Error('WeekDay not found');
    }

    if (weekDay.getStatus() === SharedStatus.INACTIVE) {
      throw new Error('WeekDay is already inactive');
    }

    weekDay.deactivate();
    return this.weekDayRepository.save(weekDay);
  }
}
