import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ParamsId } from '@/shared/dto/ParamsId';
import type { ApiDataResponse } from '@/shared/types/ApiResponse';
import { CreateBukiInformationDto } from './CreateBukiInformationDto';
import { UpdateBukiInformationDto } from './UpdateBukiInformationDto';

import { ListSubjectsUseCase } from '../../application/subjects/ListSubjectsUseCase';
import { ListZonesUseCase } from '../../application/zones/ListZonesUseCase';
import { ListGradeLevelsUseCase } from '../../application/grade-level/ListGradeLevelsUseCase';
import { ListWeekDaysUseCase } from '../../application/lesson-days/ListWeekDaysUseCase';
import { ListTeacherPricingTiersUseCase } from '../../application/teacher-pricing-tier/ListTeacherPricingTiersUseCase';

import { CreateSubjectUseCase } from '../../application/subjects/CreateSubjectUseCase';
import { CreateZoneUseCase } from '../../application/zones/CreateZoneUseCase';
import { CreateGradeLevelUseCase } from '../../application/grade-level/CreateGradeLevelUseCase';
import { CreateWeekdayUseCase } from '../../application/lesson-days/CreateWeekdayUseCase';
import { CreateTeacherPricingTierUseCase } from '../../application/teacher-pricing-tier/CreateTeacherPricingTierUseCase';

import { ActivateSubjectUseCase } from '../../application/subjects/ActivateSubjectUseCase';
import { ActivateZoneUseCase } from '../../application/zones/ActivateZoneUseCase';
import { ActivateGradeLevelUseCase } from '../../application/grade-level/ActivateGradeLevelUseCase';
import { ActivateWeekDayUseCase } from '../../application/lesson-days/ActivateWeekDayUseCase';
import { ActivateTeacherPricingTierUseCase } from '../../application/teacher-pricing-tier/ActivateTeacherPricingTierUseCase';

import { DeactivateSubjectUseCase } from '../../application/subjects/DeactivateSubjectUseCase';
import { DeactivateZoneUseCase } from '../../application/zones/DeactivateZoneUseCase';
import { DeactivateGradeLevelUseCase } from '../../application/grade-level/DeactivateGradeLevelUseCase';
import { DeactivateWeekDayUseCase } from '../../application/lesson-days/DeactivateWeekDayUseCase';
import { DeactivateTeacherPricingTierUseCase } from '../../application/teacher-pricing-tier/DeactivateTeacherPricingTierUseCase';

import { DeleteSubjectUseCase } from '../../application/subjects/DeleteSubjectUseCase';
import { DeleteZoneUseCase } from '../../application/zones/DeleteZoneUseCase';
import { DeleteGradeLevelUseCase } from '../../application/grade-level/DeleteGradeLevelUseCase';
import { DeleteWeekDayUseCase } from '../../application/lesson-days/DeleteWeekDayUseCase';
import { DeleteTeacherPricingTierUseCase } from '../../application/teacher-pricing-tier/DeleteTeacherPricingTierUseCase';

import { UpdateSubjectUseCase } from '../../application/subjects/UpdateSubjectUseCase';
import { UpdateZoneUseCase } from '../../application/zones/UpdateZoneUseCase';
import { UpdateGradeLevelUseCase } from '../../application/grade-level/UpdateGradeLevelUseCase';
import { UpdateWeekDayUseCase } from '../../application/lesson-days/UpdateWeekDayUseCase';
import { UpdateBukiPricingTierUseCase } from '../../application/teacher-pricing-tier/UpdateTeacherPricingTierUseCase';
import { RoleGuard } from '@/shared/guard/role.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UserAccountType } from '@/shared/domain/user/UserAccountType';

@Controller('bukis')
export class BukiController {
  constructor(
    private createSubjectUseCase: CreateSubjectUseCase,
    private activateSubjectUseCase: ActivateSubjectUseCase,
    private updateSubjectUseCase: UpdateSubjectUseCase,
    private deleteSubjectUseCase: DeleteSubjectUseCase,
    private deactivateSubjectUseCase: DeactivateSubjectUseCase,

    private createZoneUseCase: CreateZoneUseCase,
    private activateZoneUseCase: ActivateZoneUseCase,
    private deactivateZoneUseCase: DeactivateZoneUseCase,
    private deleteZoneUseCase: DeleteZoneUseCase,
    private updateZoneUseCase: UpdateZoneUseCase,

    private createGradeLevelUseCase: CreateGradeLevelUseCase,
    private activateGradeLevelUseCase: ActivateGradeLevelUseCase,
    private deactivateGradeLevelUseCase: DeactivateGradeLevelUseCase,
    private deleteGradeLevelUseCase: DeleteGradeLevelUseCase,
    private updateGradeLevelUseCase: UpdateGradeLevelUseCase,

    private createLessonDayUseCase: CreateWeekdayUseCase,
    private activateLessonDayUseCase: ActivateWeekDayUseCase,
    private deactivateLessonDayUseCase: DeactivateWeekDayUseCase,
    private deleteLessonDayUseCase: DeleteWeekDayUseCase,
    private updateLessonDayUseCase: UpdateWeekDayUseCase,

    private createTeacherPricingTierUseCase: CreateTeacherPricingTierUseCase,
    private activateTeacherPricingTierUseCase: ActivateTeacherPricingTierUseCase,
    private deactivateTeacherPricingTierUseCase: DeactivateTeacherPricingTierUseCase,
    private deleteTeacherPricingTierUseCase: DeleteTeacherPricingTierUseCase,
    private updateTeacherPricingTierUseCase: UpdateBukiPricingTierUseCase,

    private listSubjectsUseCase: ListSubjectsUseCase,
    private listZonesUseCase: ListZonesUseCase,
    private listGradeLevelsUseCase: ListGradeLevelsUseCase,
    private listWeekDaysUseCase: ListWeekDaysUseCase,
    private listTeacherPricingTiersUseCase: ListTeacherPricingTiersUseCase,
  ) {}

  @Post('/subject/create')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async createSubject(
    @Body() body: CreateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.createSubjectUseCase.execute(body.name);

    return {
      success: true,
      message: 'Disciplina criada com sucesso.',
    };
  }

  @Patch('/subject/:id/activate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async activateSubject(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.activateSubjectUseCase.execute(params.id);

    return {
      success: true,
      message: 'Disciplina activada com sucesso.',
    };
  }

  @Post('/zone/create')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async createZone(
    @Body() body: CreateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.createZoneUseCase.execute(body.name);

    return {
      success: true,
      message: 'Zona de aula criada com sucesso.',
    };
  }

  @Patch('/zone/:id/activate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async activateZone(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.activateZoneUseCase.execute(params.id);

    return {
      success: true,
      message: 'Zona de aula activada criada com sucesso.',
    };
  }

  @Post('/gradeLevel/create')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async createGradeLevel(
    @Body() body: CreateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.createGradeLevelUseCase.execute(body.name);

    return {
      success: true,
      message: 'Nível de ensino criado com sucesso.',
    };
  }

  @Patch('/gradeLevel/:id/activate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async activateGradeLevel(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.activateGradeLevelUseCase.execute(params.id);

    return {
      success: true,
      message: 'Nível de ensino activado com sucesso.',
    };
  }

  @Post('/lessonDay/create')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async createLessonDay(
    @Body() body: CreateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.createLessonDayUseCase.execute(body.name);

    return {
      success: true,
      message: 'Dia de aula criada com sucesso.',
    };
  }

  @Patch('/lessonDay/:id/activate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async activateLessonDay(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.activateLessonDayUseCase.execute(params.id);

    return {
      success: true,
      message: 'Dia de aula activado com sucesso.',
    };
  }

  @Post('/teacher-pricing-tier/create')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async createTeacherPricingTier(
    @Body() body: CreateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.createTeacherPricingTierUseCase.execute(body.name);

    return {
      success: true,
      message: 'Plano de preço criado com sucesso.',
    };
  }

  @Patch('/teacher-pricing-tier/:id/activate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async activateTeacherPricingTier(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.activateTeacherPricingTierUseCase.execute(params.id);

    return {
      success: true,
      message: 'Plano de preço activado com sucesso.',
    };
  }

  @Patch('/subject/:id/deactivate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deactivateSubject(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deactivateSubjectUseCase.execute(params.id);

    return {
      success: true,
      message: 'Disciplina desactivada com sucesso.',
    };
  }

  @Patch('/zone/:id/deactivate')
  async deactivateZone(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deactivateZoneUseCase.execute(params.id);

    return {
      success: true,
      message: 'Zona de aula desactivada com sucesso.',
    };
  }

  @Patch('/gradeLevel/:id/deactivate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deactivateGradeLevel(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.deactivateGradeLevelUseCase.execute(params.id);

    return {
      success: true,
      message: 'Nível de ensino desactivado com sucesso.',
    };
  }

  @Patch('/lessonDay/:id/deactivate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deactivateLessonDay(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.deactivateLessonDayUseCase.execute(params.id);

    return {
      success: true,
      message: 'Dia de aula desactivado com sucesso.',
    };
  }

  @Patch('/teacher-pricing-tier/:id/deactivate')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deactivateTeacherPricingTier(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.deactivateTeacherPricingTierUseCase.execute(params.id);

    return {
      success: true,
      message: 'Plano de preço desactivado com sucesso.',
    };
  }

  @Delete('/subject/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deleteSubject(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deleteSubjectUseCase.execute(params.id);

    return {
      success: true,
      message: 'Disciplina eliminada com sucesso.',
    };
  }

  @Delete('/zone/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deleteZone(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deleteZoneUseCase.execute(params.id);

    return {
      success: true,
      message: 'Zona de aula eliminada com sucesso.',
    };
  }

  @Delete('/gradeLevel/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deleteGradeLevel(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deleteGradeLevelUseCase.execute(params.id);

    return {
      success: true,
      message: 'Nível de ensino eliminado com sucesso.',
    };
  }

  @Delete('/lessonDay/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deleteLessonDay(@Param() params: ParamsId): Promise<ApiDataResponse> {
    await this.deleteLessonDayUseCase.execute(params.id);

    return {
      success: true,
      message: 'Dia de aula eliminado com sucesso.',
    };
  }

  @Delete('/teacher-pricing-tier/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async deleteTeacherPricingTier(
    @Param() params: ParamsId,
  ): Promise<ApiDataResponse> {
    await this.deleteTeacherPricingTierUseCase.execute(params.id);

    return {
      success: true,
      message: 'Plano de preço eliminado com sucesso.',
    };
  }

  @Patch('/subject/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async updateSubject(
    @Param() params: ParamsId,
    @Body() body: UpdateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateSubjectUseCase.execute(params.id, body.name);

    return {
      success: true,
      message: 'Disciplina actualizada com sucesso.',
    };
  }

  @Patch('/zone/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async updateZone(
    @Param() params: ParamsId,
    @Body() body: UpdateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateZoneUseCase.execute(params.id, body.name);

    return {
      success: true,
      message: 'Zona de aula actualizada com sucesso.',
    };
  }

  @Patch('/gradeLevel/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async updateGradeLevel(
    @Param() params: ParamsId,
    @Body() body: UpdateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateGradeLevelUseCase.execute(params.id, body.name);

    return {
      success: true,
      message: 'Nível de ensino actualizado com sucesso.',
    };
  }

  @Patch('/lessonDay/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async updateLessonDay(
    @Param() params: ParamsId,
    @Body() body: UpdateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateLessonDayUseCase.execute(params.id, body.name);

    return {
      success: true,
      message: 'Dia de aula actualizado com sucesso.',
    };
  }

  @Patch('/teacher-pricing-tier/:id')
  @Roles(UserAccountType.MANAGER)
  @UseGuards(RoleGuard)
  async updateTeacherPricingTier(
    @Param() params: ParamsId,
    @Body() body: UpdateBukiInformationDto,
  ): Promise<ApiDataResponse> {
    await this.updateTeacherPricingTierUseCase.execute(params.id, body.name);

    return {
      success: true,
      message: 'Plano de preço actualizado com sucesso.',
    };
  }

  @Get('/subjects')
  async listSubjects(): Promise<ApiDataResponse> {
    const subjects = await this.listSubjectsUseCase.execute();

    return {
      success: true,
      data: subjects,
    };
  }

  @Get('/zones')
  async listZones(): Promise<ApiDataResponse> {
    const zones = await this.listZonesUseCase.execute();

    return {
      success: true,
      data: zones,
    };
  }

  @Get('/gradeLevels')
  async listGradeLevels(): Promise<ApiDataResponse> {
    const gradeLevels = await this.listGradeLevelsUseCase.execute();

    return {
      success: true,
      data: gradeLevels,
    };
  }

  @Get('/lessonDays')
  async listLessonDays(): Promise<ApiDataResponse> {
    const days = await this.listWeekDaysUseCase.execute();

    return {
      success: true,
      data: days,
    };
  }

  @Get('/teacher-pricing-tiers')
  async listTeacherPricingTiers(): Promise<ApiDataResponse> {
    const tiers = await this.listTeacherPricingTiersUseCase.execute();

    return {
      success: true,
      data: tiers,
    };
  }
}
