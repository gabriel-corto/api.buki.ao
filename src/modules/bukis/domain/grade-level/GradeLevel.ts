import { SharedStatus } from '@/shared/domain/SharedStatus';
import { GradeLevelName } from './GradeLevelName';

export class GradeLevel {
  private readonly id: string;
  private name: GradeLevelName;
  private status: SharedStatus;

  private constructor(id: string, name: GradeLevelName, status: SharedStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public static create(name: GradeLevelName): GradeLevel {
    return new GradeLevel(crypto.randomUUID(), name, SharedStatus.ACTIVE);
  }

  public static restore(
    id: string,
    name: GradeLevelName,
    status: SharedStatus,
  ): GradeLevel {
    return new GradeLevel(id, name, status);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): GradeLevelName {
    return this.name;
  }

  public getStatus(): SharedStatus {
    return this.status;
  }

  public setName(name: GradeLevelName): void {
    this.name = name;
  }

  public activate(): void {
    this.status = SharedStatus.ACTIVE;
  }

  public deactivate(): void {
    this.status = SharedStatus.INACTIVE;
  }
}
