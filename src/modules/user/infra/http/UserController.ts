import {
  Body,
  Controller,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadTeacherAvatar(
    @CurrentUser() user: OnboardingTokenPayload,
    @UploadedFile('avatar') avatar: Express.Multer.File,
    @UploadedFile('bi') bi: Express.Multer.File,
  ): Promise<ApiDataResponse> {
    const { avatarUrl } = await this.uploadTeacherDocumentUseCase.execute({
      userId: user.userId as string,
      avatar,
      bi,
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
