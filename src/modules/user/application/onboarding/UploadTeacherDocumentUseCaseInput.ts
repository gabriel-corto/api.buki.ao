export interface UploadTeacherDocumentUseCaseInput {
  userId: string;
  avatar: Express.Multer.File;
  bi: Express.Multer.File;
}
