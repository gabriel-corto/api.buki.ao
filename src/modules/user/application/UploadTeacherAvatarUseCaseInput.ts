export interface UploadTeacherAvatarUseCaseInput {
  userId: string;
  avatar: Express.Multer.File;
}
