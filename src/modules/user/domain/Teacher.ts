import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { Subject } from '@/modules/bukis/domain/subject/Subject';

import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';
import { PricePolicy } from '@/modules/bukis/domain/price/PricePolicy';

import { TeacherProfileStatus } from './TeacherProfileStatus';

export class Teacher {
  private readonly userId: string;
  private avatar: string;
  private subjects: Subject[];
  private weekDays: WeekDay[];
  private lessonZones: Zone[];
  private gradeLevels: GradeLevel[];
  private pricePolicy: PricePolicy;
  private status: TeacherProfileStatus;

  private constructor(
    userId: string,
    avatar: string,
    subjects: Subject[],
    weekDays: WeekDay[],
    lessonZones: Zone[],
    gradeLevels: GradeLevel[],
    pricePolicy: PricePolicy,
    status: TeacherProfileStatus,
  ) {
    this.userId = userId;
    this.avatar = avatar;
    this.subjects = subjects;
    this.weekDays = weekDays;
    this.lessonZones = lessonZones;
    this.gradeLevels = gradeLevels;
    this.pricePolicy = pricePolicy;
    this.status = status;
  }

  public static create(
    userId: string,
    avatar: string,
    subjects: Subject[],
    weekDays: WeekDay[],
    lessonZones: Zone[],
    gradeLevels: GradeLevel[],
    pricePolicy: PricePolicy,
  ): Teacher {
    return new Teacher(
      userId,
      avatar,
      subjects,
      weekDays,
      lessonZones,
      gradeLevels,
      pricePolicy,
      TeacherProfileStatus.PENDING,
    );
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getSubjects(): Subject[] {
    return this.subjects;
  }

  public getWeekDays(): WeekDay[] {
    return this.weekDays;
  }

  public getLessonZones(): Zone[] {
    return this.lessonZones;
  }

  public getGradeLevels(): GradeLevel[] {
    return this.gradeLevels;
  }

  public getPricePolicy(): PricePolicy {
    return this.pricePolicy;
  }

  public updateAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public updateSubjects(subjects: Subject[]): void {
    this.subjects = subjects;
  }

  public updateWeekDays(weekDays: WeekDay[]): void {
    this.weekDays = weekDays;
  }

  public updateLessonZones(lessonZones: Zone[]): void {
    this.lessonZones = lessonZones;
  }

  public updateGradeLevels(gradeLevels: GradeLevel[]): void {
    this.gradeLevels = gradeLevels;
  }

  public updatePricePolicy(pricePolicy: PricePolicy): void {
    this.pricePolicy = pricePolicy;
  }
}
