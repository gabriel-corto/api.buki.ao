import { SharedStatus } from '@/shared/domain/SharedStatus';

export class WeekDay {
  private readonly id: string;
  private name: string;
  private status: SharedStatus;

  private constructor(id: string, name: string, status: SharedStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public static create(name: string): WeekDay {
    return new WeekDay(crypto.randomUUID(), name, SharedStatus.ACTIVE);
  }
  public static restore(
    id: string,
    name: string,
    status: SharedStatus,
  ): WeekDay {
    return new WeekDay(id, name, status);
  }

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
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
