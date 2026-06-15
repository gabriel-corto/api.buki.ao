import { Injectable } from '@nestjs/common';
import { StorageService } from '../../domain/StorageService';

@Injectable()
export class FakeStorageService implements StorageService {
  async upload(file: Express.Multer.File): Promise<string> {
    await Promise.resolve();
    return `https://fake-storage.com/${file.originalname}`;
  }
}
