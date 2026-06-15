import { Injectable, NotFoundException } from '@nestjs/common';

import { UploadTeacherAvatarUseCaseInput } from './UploadTeacherAvatarUseCaseInput';

import { StorageService } from '@/shared/domain/StorageService';

import { TeacherRepository } from '../domain/TeacherRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';

@Injectable()
export class UploadTeacherAvatarUseCase {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute(input: UploadTeacherAvatarUseCaseInput) {
    const user = await this.userRepository.findById(input.userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const teacher = await this.teacherRepository.findByUserId(user.getId());
    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    const avatarUrl = await this.storageService.upload(input.avatar);
    teacher.updateAvatar(avatarUrl);

    await this.teacherRepository.save(teacher);

    return {
      avatarUrl,
    };
  }
}
