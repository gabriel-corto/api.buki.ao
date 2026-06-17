import { IsBase64, IsNotEmpty } from 'class-validator';

export class UploadTeacherAvatarDto {
  @IsBase64()
  @IsNotEmpty()
  avatar: string;

  @IsBase64()
  @IsNotEmpty()
  bi: string;
}
