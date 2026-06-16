export class Customer {
  private userId: string;

  private constructor(userId: string) {
    this.userId = userId;
  }

  public static create(userId: string): Customer {
    return new Customer(userId);
  }

  public static restore(userId: string): Customer {
    return new Customer(userId);
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }
}
