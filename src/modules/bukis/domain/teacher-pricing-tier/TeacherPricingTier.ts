import { SharedStatus } from '@/shared/domain/SharedStatus';

export class TeacherPricingTier {
  private readonly id: string;
  private value: string;
  private status: SharedStatus;

  private constructor(id: string, value: string, status: SharedStatus) {
    this.id = id;
    this.value = value;
    this.status = status;
  }

  public static create(value: string): TeacherPricingTier {
    return new TeacherPricingTier(
      crypto.randomUUID(),
      value,
      SharedStatus.ACTIVE,
    );
  }

  public static restore(
    id: string,
    value: string,
    status: SharedStatus,
  ): TeacherPricingTier {
    return new TeacherPricingTier(id, value, status);
  }

  public getId(): string {
    return this.id;
  }

  public getValue(): string {
    return this.value;
  }

  public getStatus(): SharedStatus {
    return this.status;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public activate(): void {
    this.status = SharedStatus.ACTIVE;
  }

  public deactivate(): void {
    this.status = SharedStatus.INACTIVE;
  }
}
