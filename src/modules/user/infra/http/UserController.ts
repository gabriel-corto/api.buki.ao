import {
  Body,
  Controller,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { StartOnBoardingUseCase } from '../../application/StartOnboardingUseCase';
import { UploadTeacherDocumentUseCase } from '../../application/UploadTeacherDocumentUseCase';
import { UpdateTeacherBukiInformationUseCase } from '../../application/UpdateTeacherBukiInformationUseCase';

import { StartOnBoardingDto } from './StartOnBoardingDto';
import { UpdateTeacherBukiInformationDto } from './UpdateTeacherBukiInformationDto';

import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { SkipAuth } from '@/shared/decorators/skip-auth.decorator';
import { OnboardingGuard } from '@/shared/guard/onboarding.guard';

import { type ApiDataResponse } from '@/shared/types/ApiResponse';
import {
  type OnboardingTokenPayload,
  type TokenPayload,
} from '@/modules/auth/domain/TokenService';

@Controller('users')
export class UserController {
  constructor(
    private readonly startOnBoardingUseCase: StartOnBoardingUseCase,
    private readonly uploadTeacherDocumentUseCase: UploadTeacherDocumentUseCase,
    private readonly updateTeacherBukiInformationUseCase: UpdateTeacherBukiInformationUseCase,
  ) {}

  @Post('/profile/onboarding')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
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

  @Patch('/profile/teacher-document')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bi', maxCount: 1 },
    ]),
  )
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
      message: 'Foto de perfil atualizada com sucesso!',
    };
  }

  @Put('/profile/teacher-buki-information')
  @SkipAuth()
  @UseGuards(OnboardingGuard)
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
      message: 'Informações actualizadas com sucesso',
    };
  }
}
