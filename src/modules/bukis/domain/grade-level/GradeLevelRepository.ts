import { GradeLevel } from './GradeLevel';

export abstract class GradeLevelRepository {
  abstract save(gradeLevel: GradeLevel): Promise<GradeLevel>;
  abstract findAll(): Promise<GradeLevel[]>;
  abstract findById(id: string): Promise<GradeLevel | null>;
  abstract delete(id: string): Promise<void>;
}
