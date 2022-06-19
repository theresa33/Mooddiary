import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/User.entity';
import { DeleteResult, Repository } from 'typeorm';
import { isDate } from 'util/types';
import { Entry } from './entity/Entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}
  
  public async getEntriesByUser(user: User): Promise<Entry[]> {
    const entries =  await this.entryRepository.find({where: { user}});
    return entries;
  }

  public async insertNewEntry(entry: Entry, user: User): Promise<Entry> {
    entry.user = user;
    console.log(entry);
    return await this.entryRepository.save(entry);
  }

  public async getEntryByID(id: string): Promise<Entry> {
    return await this.entryRepository.findOne(id);
  }
 

  public async deleteEntryByID(id: string): Promise<DeleteResult> {
    return await this.entryRepository.delete(id);
     }
}
