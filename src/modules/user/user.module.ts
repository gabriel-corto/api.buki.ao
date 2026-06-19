import { Module } from '@nestjs/common';
import { UserController } from './infra/http/UserController';
import { BukisModule } from '../bukis/bukis.module';

import { UserRepository } from '@/shared/domain/user/UserRepository';
import { PrismaUserRepository } from './infra/database/prisma/repositories/PrismaUserRepository';
import { CustomerRepository } from './domain/customer/CustomerRepository';
import { PrismaCustomerRepository } from './infra/database/prisma/repositories/PrismaCustomerRepository';
import { TeacherRepository } from './domain/teacher/TeacherRepository';
import { PrismaTeacherRepository } from './infra/database/prisma/repositories/PrismaTeacherRepository';

import { StartOnBoardingUseCase } from './application/onboarding/StartOnboardingUseCase';
import { UploadTeacherDocumentUseCase } from './application/onboarding/UploadTeacherDocumentUseCase';
import { UpdateTeacherBukiInformationUseCase } from './application/onboarding/UpdateTeacherBukiInformationUseCase';
import { UpdateTeacherPricingTierUseCase } from './application/onboarding/UpdateTeacherPricingTierUseCase';
import { ListTeachersUseCase } from './application/teacher/ListTeachersUseCase';
import { ApproveTeacherUseCase } from './application/teacher/ApproveTeacherUseCase';
import { ReproveTeacherUseCase } from './application/teacher/ReproveTeacherUseCase';
import { ListCustomersUseCase } from './application/customer/ListCustomersUseCase';

import { StorageService } from '@/shared/domain/StorageService';
import { CloudinaryStorageService } from '@/shared/infra/storage/CloudinaryStorageService';

@Module({
  imports: [BukisModule],
  controllers: [UserController],
  providers: [
    StartOnBoardingUseCase,
    UploadTeacherDocumentUseCase,
    UpdateTeacherBukiInformationUseCase,
    UpdateTeacherPricingTierUseCase,
    ListTeachersUseCase,
    ApproveTeacherUseCase,
    ReproveTeacherUseCase,
    ListCustomersUseCase,
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
      provide: StorageService,
      useClass: CloudinaryStorageService,
    },
  ],
  exports: [UserRepository, TeacherRepository, CustomerRepository],
})
export class UserModule {}
