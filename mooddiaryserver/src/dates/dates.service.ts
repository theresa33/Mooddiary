import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatesQueryDto } from './dto/DatesQuery.dto';

@Injectable()
export class DatesService {
    
    constructor(
        @InjectRepository(Date)
        private readonly dateRepository: Repository<Date>,
    ) {}

        public async getAllDates(): Promise<Date[]> {
        return await this.dateRepository.find();
      }

         public async insertNewDate(date: Date): Promise<Date> {
        return await this.dateRepository.save(date);
     }


}
