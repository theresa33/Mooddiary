import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){}


    public async create(data: any): Promise<User> {
        return this.userRepository.save(data);
    }

    public async findOne(condition: any): Promise<User> {
        return this.userRepository.findOne(condition);

    }

    public async getuserByID(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
      }
}



