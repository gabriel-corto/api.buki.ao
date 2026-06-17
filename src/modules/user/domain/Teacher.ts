import { Zone } from '@/modules/bukis/domain/zone/Zone';
import { Subject } from '@/modules/bukis/domain/subject/Subject';

import { WeekDay } from '@/modules/bukis/domain/weekday/WeekDay';
import { GradeLevel } from '@/modules/bukis/domain/grade-level/GradeLevel';

import { TeacherProfileStatus } from './TeacherProfileStatus';
import { generateTeacherId } from '@/shared/helpers/GenerateBukiIDs';

export class Teacher {
  private readonly id: string;
  private readonly userId: string;
  private avatar: string;
  private biUrl: string;
  private subjects: Subject[];
  private weekDays: WeekDay[];
  private lessonZones: Zone[];
  private gradeLevels: GradeLevel[];
  private priceTier: string | null;
  private status: TeacherProfileStatus;

  private constructor(
    id: string,
    userId: string,
    avatar: string,
    biUrl: string,
    subjects: Subject[],
    weekDays: WeekDay[],
    lessonZones: Zone[],
    gradeLevels: GradeLevel[],
    priceTier: string | null,
    status: TeacherProfileStatus,
  ) {
    this.id = id;
    this.userId = userId;
    this.avatar = avatar;
    this.biUrl = biUrl;
    this.subjects = subjects;
    this.weekDays = weekDays;
    this.lessonZones = lessonZones;
    this.gradeLevels = gradeLevels;
    this.priceTier = priceTier;
    this.status = status;
  }

  public static create(userId: string): Teacher {
    return new Teacher(
      generateTeacherId(),
      userId,
      '',
      '',
      [],
      [],
      [],
      [],
      null,
      TeacherProfileStatus.PENDING,
    );
  }

  public static restore(
    id: string,
    userId: string,
    avatar: string,
    biUrl: string,
    subjects: Subject[],
    weekDays: WeekDay[],
    lessonZones: Zone[],
    gradeLevels: GradeLevel[],
    priceTier: string | null,
    status: TeacherProfileStatus,
  ): Teacher {
    return new Teacher(
      id,
      userId,
      avatar,
      biUrl,
      subjects,
      weekDays,
      lessonZones,
      gradeLevels,
      priceTier,
      status,
    );
  }

  public getUserId(): string {
    return this.userId;
  }

  public getId(): string {
    return this.id;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getBiUrl(): string {
    return this.biUrl;
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

  public getPriceTier(): string | null {
    return this.priceTier;
  }

  public getStatus(): TeacherProfileStatus {
    return this.status;
  }

  public updateAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public updateBiUrl(biUrl: string): void {
    this.biUrl = biUrl;
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

  public updatePriceTier(priceTier: string): void {
    this.priceTier = priceTier;
  }

  public approve(): void {
    this.status = TeacherProfileStatus.APPROVED;
  }

  public reject(): void {
    this.status = TeacherProfileStatus.REJECTED;
  }
}
