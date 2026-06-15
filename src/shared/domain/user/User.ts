import { Phone } from './Phone';
import { UserRole } from './UserRole';
import { UserStatus } from './UserStatus';
import { UserAccountType } from './UserAccountType';

export class User {
  private readonly id: string;
  private name: string;
  private phone: Phone;
  private email: string | null;
  private role: UserRole;
  private accountType: UserAccountType | null;
  private status: UserStatus;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: string,
    name: string,
    phone: Phone,
    email: string | null,
    role: UserRole,
    accountType: UserAccountType | null,
    status: UserStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email ? email : null;
    this.role = role;
    this.accountType = accountType;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create(
    name: string,
    phone: string,
    accountType: UserAccountType,
  ): User {
    return new User(
      crypto.randomUUID(),
      name,
      Phone.create(phone),
      null,
      UserRole.COMMON,
      accountType,
      UserStatus.ACTIVE,
      new Date(),
      new Date(),
    );
  }

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getPhone(): Phone {
    return this.phone;
  }
  public getEmail(): string | null {
    return this.email;
  }
  public getRole(): UserRole {
    return this.role;
  }
  public getAcountType(): UserAccountType | null {
    return this.accountType;
  }
  public getStatus(): UserStatus {
    return this.status;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  public setName(value: string) {
    this.name = value;
    this.updatedAt = new Date();
  }
  public setPhone(value: string) {
    this.phone = Phone.create(value);
    this.updatedAt = new Date();
  }
  public setEmail(value: string) {
    this.email = value;
    this.updatedAt = new Date();
  }
  public setRole(value: UserRole) {
    this.role = value;
    this.updatedAt = new Date();
  }
  public setAccountType(value: UserAccountType) {
    this.accountType = value;
    this.updatedAt = new Date();
  }
  public setStatus(value: UserStatus) {
    this.status = value;
    this.updatedAt = new Date();
  }
}
