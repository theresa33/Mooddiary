import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/User.entity';
import { DeleteResult, Repository } from 'typeorm';
import { DatesQueryDto } from './dto/DatesQuery.dto';
import { Date } from './entity/Date.entity';

@Injectable()
export class DatesService {
    
    constructor(
        @InjectRepository(Date)
        private readonly dateRepository: Repository<Date>,
    ) {}

        public async getDatesByUser(user: User): Promise<Date[]> {
            return await this.dateRepository.find({where: {user}});
      }

         public async insertNewDate(date: Date, user: User): Promise<Date> {
            date.user = user;
            return await this.dateRepository.save(date);
     }

        public async getDateByID(id: string): Promise<Date> {
            return await this.dateRepository.findOne(id);
        }

      public async deleteDateByID(id: string): Promise<DeleteResult> {
        return await this.dateRepository.delete(id);
         }

         public async findOne(condition: any): Promise<Date> {
            return this.dateRepository.findOne(condition);
    
        }
     


}
