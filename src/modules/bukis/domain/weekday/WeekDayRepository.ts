import { WeekDay } from './WeekDay';

export abstract class WeekDayRepository {
  abstract save(weekday: WeekDay): Promise<WeekDay>;
  abstract delete(weekday: WeekDay): Promise<WeekDay>;
  abstract findById(id: string): Promise<WeekDay>;
  abstract findAll(): Promise<WeekDay[]>;
}
