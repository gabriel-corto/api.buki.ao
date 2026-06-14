import { SharedStatus } from '@/shared/domain/SharedStatus';

export class Zone {
  private readonly id: string;
  private name: string;
  private status: SharedStatus;

  private constructor(id: string, name: string, status: SharedStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public static create(name: string): Zone {
    return new Zone(crypto.randomUUID(), name, SharedStatus.ACTIVE);
  }

  public static restore(id: string, name: string, status: SharedStatus): Zone {
    return new Zone(id, name, status);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getStatus(): SharedStatus {
    return this.status;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public activate(): void {
    this.status = SharedStatus.ACTIVE;
  }

  public deactivate(): void {
    this.status = SharedStatus.INACTIVE;
  }
}
