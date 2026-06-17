import { Injectable, NotFoundException } from '@nestjs/common';

import { StorageService } from '@/shared/domain/StorageService';

import { TeacherRepository } from '../domain/TeacherRepository';
import { UserRepository } from '@/shared/domain/user/UserRepository';

import { UploadTeacherDocumentUseCaseInput } from './UploadTeacherDocumentUseCaseInput';

@Injectable()
export class UploadTeacherDocumentUseCase {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
  ) {}

  async execute(input: UploadTeacherDocumentUseCaseInput) {
    const user = await this.userRepository.findById(input.userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const teacher = await this.teacherRepository.findByUserId(user.getId());
    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    const avatarUrl = await this.storageService.publicUpload(input.avatar);
    teacher.updateAvatar(avatarUrl);

    const biUrl = await this.storageService.privateUpload(input.bi);
    teacher.updateBiUrl(biUrl);

    await this.teacherRepository.save(teacher);

    return {
      avatarUrl,
    };
  }
}
