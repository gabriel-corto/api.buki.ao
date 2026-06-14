import { SharedStatus } from '@/shared/domain/SharedStatus';
import { PriceTier } from './PriceTier';

export class PricePolicy {
  private readonly id: string;
  private value: PriceTier;
  private status: SharedStatus;

  private constructor(id: string, value: PriceTier, status: SharedStatus) {
    this.id = id;
    this.value = value;
    this.status = status;
  }

  public static create(value: PriceTier): PricePolicy {
    return new PricePolicy(crypto.randomUUID(), value, SharedStatus.ACTIVE);
  }

  public static restore(
    id: string,
    value: PriceTier,
    status: SharedStatus,
  ): PricePolicy {
    return new PricePolicy(id, value, status);
  }

  public getId(): string {
    return this.id;
  }

  public getValue(): PriceTier {
    return this.value;
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
