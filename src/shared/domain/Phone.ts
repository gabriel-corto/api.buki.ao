export class Phone {
  private readonly value: string;
  private readonly ANGOLAN_PHONE_REGEX = '^[0-9]{9}';

  private constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  public static create(value: string): Phone {
    return new Phone(value);
  }

  public getValue(): string {
    return this.value;
  }

  private validate(value: string): void {
    if (value.length !== 9) {
      throw new Error('Número de telefone inválido');
    }
  }
}
