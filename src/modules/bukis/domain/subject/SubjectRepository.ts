import { Subject } from './Subject';

export abstract class SubjectRepository {
  abstract save(subject: Subject): Promise<Subject>;
  abstract findAll(): Promise<Subject[]>;
  abstract findById(id: string): Promise<Subject | null>;
  abstract delete(id: string): Promise<void>;
}
