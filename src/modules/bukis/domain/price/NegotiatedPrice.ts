import { PriceTier } from './PriceTier';

export class NegotiatedPrice {
  private readonly value: number;
  private readonly tier: PriceTier;

  private constructor(value: number, tier: PriceTier) {
    this.value = value;
    this.tier = tier;
  }

  public static create(value: number, tier: PriceTier): NegotiatedPrice {
    return new NegotiatedPrice(value, tier);
  }

  public getValue(): number {
    return this.value;
  }

  public getTier(): PriceTier {
    return this.tier;
  }
}
