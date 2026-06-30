import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { RoleGuard } from '@/shared/guard/role.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

import { StartOnBoardingUseCase } from '../../application/onboarding/StartOnboardingUseCase';
import { UploadTeacherDocumentUseCase } from '../../application/onboarding/UploadTeacherDocumentUseCase';
import { UpdateTeacherBukiInformationUseCase } from '../../application/onboarding/UpdateTeacherBukiInformationUseCase';
import { UpdateTeacherPricingTierUseCase } from '../../application/onboarding/UpdateTeacherPricingTierUseCase';
import { ListTeachersUseCase } from '../../application/teacher/ListTeachersUseCase';
import { ApproveTeacherUseCase } from '../../application/teacher/ApproveTeacherUseCase';
import { ReproveTeacherUseCase } from '../../application/teacher/ReproveTeacherUseCase';
import { ListCustomersUseCase } from '../../application/customer/ListCustomersUseCase';

import { StartOnBoardingDto } from './StartOnBoardingDto';
import { UpdateTeacherPricingTierDto } from './UpdateTeacherPricingTierDto';
import { UpdateTeacherBukiInformationDto } from './UpdateTeacherBukiInformationDto';

import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { SkipAuth } from '@/shared/decorators/skip-auth.decorator';
import { OnboardingGuard } from '@/shared/guard/onboarding.guard';

import { type ApiDataResponse } from '@/shared/types/ApiResponse';
import { ParamsId } from '@/shared/dto/ParamsId';
import {
  type OnboardingTokenPayload,
  type TokenPayload,
} from '@/modules/auth/domain/TokenService';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly startOnBoardingUseCase: StartOnBoardingUseCase,
    private readonly uploadTeacherDocumentUseCase: UploadTeacherDocumentUseCase,
    private readonly updateTeacherBukiInformationUseCase: UpdateTeacherBukiInformationUseCase,
    private readonly updateTeacherPricingTierUseCase: UpdateTeacherPricingTierUseCase,
    private readonly listTeachersUseCase: ListTeachersUseCase,
    private readonly approveTeacherUseCase: ApproveTeacherUseCase,
    private readonly reproveTeacherUseCase: ReproveTeacherUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
  ) {}

  @Post('/profile/onboarding')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
  @ApiOperation({ summary: 'Start user onboarding' })
  @ApiResponse({ status: 201, description: 'Onboarding started successfully' })
  async startOnBoarding(
    @CurrentUser() user: TokenPayload,
    @Body() body: StartOnBoardingDto,
  ): Promise<ApiDataResponse> {
    const { hasCompleted, accessToken, onboardingToken } =
      await this.startOnBoardingUseCase.execute({
        name: body.name,
        phone: user.phone,
        accountType: body.accountType,
      });

    return {
      data: {
        hasCompleted,
        accessToken,
        onboardingToken,
      },
      success: true,
      message: 'Conta configurada com sucesso!',
    };
  }

  @Put('/profile/onboarding/teacher-document')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bi', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Upload teacher documents (avatar and BI)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: { type: 'string', format: 'binary' },
        bi: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Documents uploaded successfully' })
  async uploadTeacherAvatar(
    @CurrentUser() user: OnboardingTokenPayload,
    @UploadedFiles()
    files: { avatar?: Express.Multer.File[]; bi?: Express.Multer.File[] },
  ): Promise<ApiDataResponse> {
    const avatar = files.avatar?.[0];
    const bi = files.bi?.[0];

    const { avatarUrl } = await this.uploadTeacherDocumentUseCase.execute({
      userId: user.userId as string,
      avatar: avatar as Express.Multer.File,
      bi: bi as Express.Multer.File,
    });

    return {
      data: {
        avatarUrl,
      },
      success: true,
      message: 'Informações atualizada com sucesso!',
    };
  }

  @Put('/profile/onboarding/teacher-buki-information')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
  @ApiOperation({ summary: 'Update teacher Buki information' })
  @ApiResponse({ status: 200, description: 'Information updated successfully' })
  async updateTeacherBukiInformation(
    @CurrentUser() user: OnboardingTokenPayload,
    @Body() body: UpdateTeacherBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateTeacherBukiInformationUseCase.execute({
      ...body,
      userId: user.userId as string,
    });

    return {
      data: {},
      success: true,
      message: 'Informações atualizada com sucesso!',
    };
  }

  @Patch('/profile/onboarding/teacher-pricing-tier')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
  @ApiOperation({ summary: 'Update teacher pricing tier' })
  @ApiResponse({
    status: 200,
    description: 'Pricing tier updated successfully',
  })
  async updateTeacherPricingTier(
    @CurrentUser() user: OnboardingTokenPayload,
    @Body() body: UpdateTeacherPricingTierDto,
  ): Promise<ApiDataResponse> {
    await this.updateTeacherPricingTierUseCase.execute({
      pricingTierId: body.pricingTierId,
      userId: user.userId as string,
    });

    return {
      data: {},
      success: true,
      message: 'Informações atualizada com sucesso!',
    };
  }

  @Get('/teachers')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'List all teachers' })
  @ApiResponse({
    status: 200,
    description: 'List of teachers retrieved successfully',
  })
  async listTeachers(): Promise<ApiDataResponse> {
    const { output } = await this.listTeachersUseCase.execute();

    return {
      data: output,
      success: true,
    };
  }

  @Patch('/teachers/:id/approve')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Approve teacher' })
  @ApiResponse({ status: 200, description: 'Teacher approved successfully' })
  async approveTeacher(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.approveTeacherUseCase.execute(params.id);

    return {
      success: true,
      message: 'Professor aprovado com sucesso!',
    };
  }

  @Patch('/teachers/:id/reprove')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Reprove teacher' })
  @ApiResponse({ status: 200, description: 'Teacher reproved successfully' })
  async reproveTeacher(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.reproveTeacherUseCase.execute(params.id);

    return {
      success: true,
      message: 'Professor reprovado com sucesso!',
    };
  }

  @Get('/customers')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'List all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of customers retrieved successfully',
  })
  async listCustomers(): Promise<ApiDataResponse> {
    const { output } = await this.listCustomersUseCase.execute();

    return {
      data: output,
      success: true,
    };
  }
}
