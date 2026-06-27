import {
  WeekDay,
  Zone,
  GradeLevel,
  TeacherPricingTier,
} from 'prisma/generated';
import { TeacherProfileStatus } from '../../domain/teacher/TeacherProfileStatus';
import { Subject } from '@/modules/bukis/domain/subject/Subject';
import { User } from '@/shared/domain/user/User';

export class ListTeacherUseCaseOutput {
  private readonly id: string;
  private readonly userId: string;
  private avatar: string;
  private biUrl: string;
  private subjects: Subject[];
  private weekDays: WeekDay[];
  private lessonZones: Zone[];
  private gradeLevels: GradeLevel[];
  private priceTier: TeacherPricingTier | null;
  private status: TeacherProfileStatus;
  private user: User;

  constructor(
    id: string,
    userId: string,
    avatar: string,
    biUrl: string,
    subjects: Subject[],
    weekDays: WeekDay[],
    lessonZones: Zone[],
    gradeLevels: GradeLevel[],
    priceTier: TeacherPricingTier | null,
    status: TeacherProfileStatus,
    user: User,
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
    this.user = user;
  }
}
