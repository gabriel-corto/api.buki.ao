import { SharedStatus } from '@/shared/domain/SharedStatus';
import { SubjectName } from './SubjectName';

export class Subject {
  private readonly id: string;
  private name: SubjectName;
  private status: SharedStatus;

  private constructor(id: string, name: SubjectName, status: SharedStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public static create(name: SubjectName): Subject {
    return new Subject(crypto.randomUUID(), name, SharedStatus.ACTIVE);
  }
  public static restore(id: string, name: SubjectName, status: SharedStatus) {
    return new Subject(id, name, status);
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
  public setName(name: SubjectName): void {
    this.name = name;
  }
  public activate(): void {
    this.status = SharedStatus.ACTIVE;
  }
  public deactivate(): void {
    this.status = SharedStatus.INACTIVE;
  }
}
