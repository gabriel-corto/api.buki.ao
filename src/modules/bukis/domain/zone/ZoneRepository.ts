import { Zone } from './Zone';

export abstract class ZoneRepository {
  abstract save(zone: Zone): Promise<void>;
  abstract findAll(): Promise<Zone[]>;
  abstract findById(id: string): Promise<Zone | null>;
  abstract delete(id: string): Promise<void>;
}
