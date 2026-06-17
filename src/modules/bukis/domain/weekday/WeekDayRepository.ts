import { WeekDay } from './WeekDay';

export abstract class WeekDayRepository {
  abstract save(weekday: WeekDay): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<WeekDay | null>;
  abstract findAll(): Promise<WeekDay[]>;
}
