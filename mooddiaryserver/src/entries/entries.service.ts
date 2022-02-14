import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entity/Entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}
  /*   entries: EntriesModule[] = [
    {
      id: 1,
      title: 'Eintrag 1',
      mood: 'Happy',
      intensity: 7,
      situation: 'lernen',
      active: true,
    },
    {
      id: 2,
      title: 'Eintrag 2',
      mood: 'sad',
      intensity: 3,
      situation: 'lernen',
      active: true,
    },
    {
      id: 3,
      title: 'Eintrag 3',
      mood: 'gut',
      intensity: 9,
      situation: 'chill',
      active: true,
    },
  ]; */
  
  public async getAllEntries(): Promise<Entry[]> {
    return await this.entryRepository.find();
  }

  public async insertNewEntry(entry: Entry): Promise<Entry> {
    return await this.entryRepository.save(entry);
  }

  public async getEntryByID(id: string): Promise<Entry> {
    //string interpolation mit diesen back tips, wir übergeben nur id weil wir nicht mehr brauchen
    return await this.entryRepository.findOne(id);
  }

  public async deleteEntryByID(id: string): Promise<Entry> {
    return await this.entryRepository.findOne(id);
  }
}
