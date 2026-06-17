export abstract class StorageService {
  abstract publicUpload(file: Express.Multer.File): Promise<string>;
  abstract privateUpload(file: Express.Multer.File): Promise<string>;
}
