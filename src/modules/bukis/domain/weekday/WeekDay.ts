import { SharedStatus } from '@/shared/domain/SharedStatus';
import { WeekDayName } from './WeekDayName';

export class WeekDay {
  private readonly id: string;
  private name: WeekDayName;
  private status: SharedStatus;

  private constructor(id: string, name: WeekDayName, status: SharedStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public static create(name: WeekDayName): WeekDay {
    return new WeekDay(crypto.randomUUID(), name, SharedStatus.ACTIVE);
  }
  public static restore(
    id: string,
    name: WeekDayName,
    status: SharedStatus,
  ): WeekDay {
    return new WeekDay(id, name, status);
  }

  public getId(): string {
    return this.id;
  }
  public getName(): WeekDayName {
    return this.name;
  }
  public setName(name: WeekDayName): void {
    this.name = name;
  }
  public getStatus(): SharedStatus {
    return this.status;
  }
  public activate(): void {
    this.status = SharedStatus.ACTIVE;
  }
  public deactivate(): void {
    this.status = SharedStatus.INACTIVE;
  }
}
