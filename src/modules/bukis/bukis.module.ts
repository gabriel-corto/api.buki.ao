import { Module } from '@nestjs/common';
import { BukiController } from './infra/http/BukisController';

import { SubjectRepository } from './domain/subject/SubjectRepository';
import { PrismaSubjectRepository } from './infra/database/prisma/repositories/PrismaSubjectRepository';
import { ZoneRepository } from './domain/zone/ZoneRepository';
import { PrismaZoneRepository } from './infra/database/prisma/repositories/PrismaZoneRepositiry';
import { GradeLevelRepository } from './domain/grade-level/GradeLevelRepository';
import { PrismaGradeLevelRepository } from './infra/database/prisma/repositories/PrismaGradeLevelRepository';
import { WeekDayRepository } from './domain/weekday/WeekDayRepository';
import { PrismaWeekdayRepository } from './infra/database/prisma/repositories/PrismaWeekdayRepository';
import { TeacherPricingTierRepository } from './domain/teacher-pricing-tier/TeacherPricingTierRepository';
import { PrismaTeacherPricingTierRepository } from './infra/database/prisma/repositories/PrismaTeacherPricingTierRepository';

import { CreateSubjectUseCase } from './application/subjects/CreateSubjectUseCase';
import { ActivateSubjectUseCase } from './application/subjects/ActivateSubjectUseCase';
import { DeactivateSubjectUseCase } from './application/subjects/DeactivateSubjectUseCase';
import { DeleteSubjectUseCase } from './application/subjects/DeleteSubjectUseCase';
import { UpdateSubjectUseCase } from './application/subjects/UpdateSubjectUseCase';
import { ListSubjectsUseCase } from './application/subjects/ListSubjectsUseCase';

import { CreateZoneUseCase } from './application/zones/CreateZoneUseCase';
import { ActivateZoneUseCase } from './application/zones/ActivateZoneUseCase';
import { DeactivateZoneUseCase } from './application/zones/DeactivateZoneUseCase';
import { DeleteZoneUseCase } from './application/zones/DeleteZoneUseCase';
import { UpdateZoneUseCase } from './application/zones/UpdateZoneUseCase';
import { ListZonesUseCase } from './application/zones/ListZonesUseCase';

import { CreateGradeLevelUseCase } from './application/grade-level/CreateGradeLevelUseCase';
import { ActivateGradeLevelUseCase } from './application/grade-level/ActivateGradeLevelUseCase';
import { DeactivateGradeLevelUseCase } from './application/grade-level/DeactivateGradeLevelUseCase';
import { DeleteGradeLevelUseCase } from './application/grade-level/DeleteGradeLevelUseCase';
import { UpdateGradeLevelUseCase } from './application/grade-level/UpdateGradeLevelUseCase';
import { ListGradeLevelsUseCase } from './application/grade-level/ListGradeLevelsUseCase';

import { CreateWeekdayUseCase } from './application/lesson-days/CreateWeekdayUseCase';
import { ActivateWeekDayUseCase } from './application/lesson-days/ActivateWeekDayUseCase';
import { DeactivateWeekDayUseCase } from './application/lesson-days/DeactivateWeekDayUseCase';
import { DeleteWeekDayUseCase } from './application/lesson-days/DeleteWeekDayUseCase';
import { UpdateWeekDayUseCase } from './application/lesson-days/UpdateWeekDayUseCase';
import { ListWeekDaysUseCase } from './application/lesson-days/ListWeekDaysUseCase';

import { CreateTeacherPricingTierUseCase } from './application/teacher-pricing-tier/CreateTeacherPricingTierUseCase';
import { ActivateTeacherPricingTierUseCase } from './application/teacher-pricing-tier/ActivateTeacherPricingTierUseCase';
import { DeactivateTeacherPricingTierUseCase } from './application/teacher-pricing-tier/DeactivateTeacherPricingTierUseCase';
import { DeleteTeacherPricingTierUseCase } from './application/teacher-pricing-tier/DeleteTeacherPricingTierUseCase';
import { UpdateBukiPricingTierUseCase } from './application/teacher-pricing-tier/UpdateTeacherPricingTierUseCase';
import { ListTeacherPricingTiersUseCase } from './application/teacher-pricing-tier/ListTeacherPricingTiersUseCase';

@Module({
  controllers: [BukiController],
  providers: [
    CreateSubjectUseCase,
    ActivateSubjectUseCase,
    DeactivateSubjectUseCase,
    DeleteSubjectUseCase,
    UpdateSubjectUseCase,

    CreateZoneUseCase,
    ActivateZoneUseCase,
    DeactivateZoneUseCase,
    DeleteZoneUseCase,
    UpdateZoneUseCase,

    CreateGradeLevelUseCase,
    ActivateGradeLevelUseCase,
    DeactivateGradeLevelUseCase,
    DeleteGradeLevelUseCase,
    UpdateGradeLevelUseCase,

    CreateWeekdayUseCase,
    ActivateWeekDayUseCase,
    DeactivateWeekDayUseCase,
    DeleteWeekDayUseCase,
    UpdateWeekDayUseCase,

    CreateTeacherPricingTierUseCase,
    ActivateTeacherPricingTierUseCase,
    DeactivateTeacherPricingTierUseCase,
    DeleteTeacherPricingTierUseCase,
    UpdateBukiPricingTierUseCase,

    ListSubjectsUseCase,
    ListZonesUseCase,
    ListGradeLevelsUseCase,
    ListWeekDaysUseCase,
    ListTeacherPricingTiersUseCase,

    {
      provide: SubjectRepository,
      useClass: PrismaSubjectRepository,
    },
    {
      provide: ZoneRepository,
      useClass: PrismaZoneRepository,
    },
    {
      provide: GradeLevelRepository,
      useClass: PrismaGradeLevelRepository,
    },
    {
      provide: WeekDayRepository,
      useClass: PrismaWeekdayRepository,
    },
    {
      provide: TeacherPricingTierRepository,
      useClass: PrismaTeacherPricingTierRepository,
    },
  ],
  exports: [
    SubjectRepository,
    ZoneRepository,
    GradeLevelRepository,
    WeekDayRepository,
    TeacherPricingTierRepository,
  ],
})
export class BukisModule {}
