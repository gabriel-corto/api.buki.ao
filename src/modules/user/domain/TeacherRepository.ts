import { Teacher } from './Teacher';

export abstract class TeacherRepository {
  abstract save(teacher: Teacher): Promise<void>;
  abstract findByUserId(userId: string): Promise<Teacher | null>;
}
