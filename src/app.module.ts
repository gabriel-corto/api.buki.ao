import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './shared/guard/auth.guard';

import { AppController } from './shared/infra/http/AppController';
import { AuthController } from './modules/auth/infra/AuthController';
import { UserController } from './modules/user/infra/http/UserController';

import { RequestOtpUseCase } from './modules/auth/application/RequestOtpUseCase';
import { VerifyOtpUseCase } from './modules/auth/application/VerifyOtpUseCase';
import { StartOnBoardingUseCase } from './modules/user/application/StartOnboardingUseCase';
import { UploadTeacherDocumentUseCase } from './modules/user/application/UploadTeacherDocumentUseCase';
import { UpdateTeacherBukiInformationUseCase } from './modules/user/application/UpdateTeacherBukiInformationUseCase';

import { SmsProvider } from './shared/domain/SmsProvider';
import { RedisModule } from './shared/infra/database/redis/redis.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';

import { OtpRepository } from './modules/auth/domain/OtpRepository';
import { RedisOtpRepository } from './modules/auth/infra/RedisOtpRepository';
import { UserRepository } from './shared/domain/user/UserRepository';
import { PrismaUserRepository } from './modules/user/infra/database/prisma/repositories/PrismaUserRepository';
import { PrismaCustomerRepository } from './modules/user/infra/database/prisma/repositories/PrismaCustomerRepository';
import { PrismaTeacherRepository } from './modules/user/infra/database/prisma/repositories/PrismaTeacherRepository';
import { CustomerRepository } from './modules/user/domain/customer/CustomerRepository';
import { TeacherRepository } from './modules/user/domain/teacher/TeacherRepository';

import { GradeLevelRepository } from './modules/bukis/domain/grade-level/GradeLevelRepository';
import { SubjectRepository } from './modules/bukis/domain/subject/SubjectRepository';
import { WeekDayRepository } from './modules/bukis/domain/weekday/WeekDayRepository';
import { PrismaGradeLevelRepository } from './modules/bukis/infra/database/prisma/repositories/PrismaGradeLevelRepository';
import { PrismaSubjectRepository } from './modules/bukis/infra/database/prisma/repositories/PrismaSubjectRepository';
import { PrismaWeekdayRepository } from './modules/bukis/infra/database/prisma/repositories/PrismaWeekdayRepository';

import { JsGeneratorOtpService } from './modules/auth/infra/JsGeneratorOtpService';
import { OtpService } from './modules/auth/domain/OtpService';
import { JwtTokenService } from './modules/auth/infra/JwtTokenService';
import { TokenService } from './modules/auth/domain/TokenService';
import { TwilioSmsProvider } from './shared/infra/sms/TwilioSmsProvider';
import { StorageService } from './shared/domain/StorageService';
import { CloudinaryStorageService } from './shared/infra/storage/CloudinaryStorageService';
import { TeacherPricingTierRepository } from './modules/bukis/domain/teacher-pricing-tier/TeacherPricingTierRepository';
import { PrismaTeacherPricingTierRepository } from './modules/bukis/infra/database/prisma/repositories/PrismaTeacherPricingTierRepository';
import { ZoneRepository } from './modules/bukis/domain/zone/ZoneRepository';
import { PrismaZoneRepository } from './modules/bukis/infra/database/prisma/repositories/PrismaZoneRepositiry';
import { UpdateTeacherPricingTierUseCase } from './modules/user/application/UpdateTeacherPricingTierUseCase';
import { CreateSubjectUseCase } from './modules/bukis/application/subjects/CreateSubjectUseCase';
import { ActivateSubjectUseCase } from './modules/bukis/application/subjects/ActivateSubjectUseCase';
import { CreateZoneUseCase } from './modules/bukis/application/zones/CreateZoneUseCase';
import { ActivateZoneUseCase } from './modules/bukis/application/zones/ActivateZoneUseCase';
import { CreateGradeLevelUseCase } from './modules/bukis/application/grade-level/CreateGradeLevelUseCase';
import { ActivateGradeLevelUseCase } from './modules/bukis/application/grade-level/ActivateGradeLevelUseCase';
import { CreateWeekdayUseCase } from './modules/bukis/application/lesson-days/CreateWeekdayUseCase';
import { ActivateWeekDayUseCase } from './modules/bukis/application/lesson-days/ActivateWeekDayUseCase';
import { CreateTeacherPricingTierUseCase } from './modules/bukis/application/teacher-pricing-tier/CreateTeacherPricingTierUseCase';
import { ActivateTeacherPricingTierUseCase } from './modules/bukis/application/teacher-pricing-tier/ActivateTeacherPricingTierUseCase';
import { BukiController } from './modules/bukis/infra/http/BukisController';
import { DeactivateGradeLevelUseCase } from './modules/bukis/application/grade-level/DeactivateGradeLevelUseCase';
import { DeactivateWeekDayUseCase } from './modules/bukis/application/lesson-days/DeactivateWeekDayUseCase';
import { DeactivateSubjectUseCase } from './modules/bukis/application/subjects/DeactivateSubjectUseCase';
import { DeactivateTeacherPricingTierUseCase } from './modules/bukis/application/teacher-pricing-tier/DeactivateTeacherPricingTierUseCase';
import { DeactivateZoneUseCase } from './modules/bukis/application/zones/DeactivateZoneUseCase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    RedisModule,
    PrismaModule,
  ],
  controllers: [AppController, AuthController, UserController, BukiController],
  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,
    StartOnBoardingUseCase,
    UploadTeacherDocumentUseCase,
    UpdateTeacherBukiInformationUseCase,
    UpdateTeacherPricingTierUseCase,
    CreateSubjectUseCase,
    ActivateSubjectUseCase,
    DeactivateSubjectUseCase,
    CreateZoneUseCase,
    ActivateZoneUseCase,
    DeactivateZoneUseCase,
    CreateGradeLevelUseCase,
    ActivateGradeLevelUseCase,
    DeactivateGradeLevelUseCase,
    CreateWeekdayUseCase,
    ActivateWeekDayUseCase,
    DeactivateWeekDayUseCase,
    CreateTeacherPricingTierUseCase,
    ActivateTeacherPricingTierUseCase,
    DeactivateTeacherPricingTierUseCase,
    {
      provide: SmsProvider,
      useClass: TwilioSmsProvider,
    },
    {
      provide: OtpRepository,
      useClass: RedisOtpRepository,
    },
    {
      provide: OtpService,
      useClass: JsGeneratorOtpService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    {
      provide: StorageService,
      useClass: CloudinaryStorageService,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: TeacherRepository,
      useClass: PrismaTeacherRepository,
    },
    {
      provide: GradeLevelRepository,
      useClass: PrismaGradeLevelRepository,
    },
    {
      provide: SubjectRepository,
      useClass: PrismaSubjectRepository,
    },
    {
      provide: WeekDayRepository,
      useClass: PrismaWeekdayRepository,
    },
    {
      provide: TeacherPricingTierRepository,
      useClass: PrismaTeacherPricingTierRepository,
    },
    {
      provide: ZoneRepository,
      useClass: PrismaZoneRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
