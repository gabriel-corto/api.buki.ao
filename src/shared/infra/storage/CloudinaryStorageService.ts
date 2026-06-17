import { StorageService } from '../../domain/StorageService';
import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryStorageService implements StorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async publicUpload(file: Express.Multer.File): Promise<string> {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const { secure_url } = await cloudinary.uploader.upload(dataUri, {
      folder: 'pubic',
    });

    return secure_url;
  }

  async privateUpload(file: Express.Multer.File): Promise<string> {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const { secure_url } = await cloudinary.uploader.upload(dataUri, {
      folder: 'private',
      secure: true,
    });

    return secure_url;
  }
}
