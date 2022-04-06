import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dot';
import { toUserDto } from './dto/toUser.dto';
import { UserDto, UsersInfoDto } from './dto/User.dto';
import { User } from './entity/User.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){}

    public async insertNewUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        return toUserDto(user);
    }

    public async findByLogin({username, password}: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } });

        if(!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        //Compare passwords: --> geht grad nicht wegen package
        const areEqual = await comparePasswords(user.password, password);
        if(!areEqual) {
            throw new HttpException('Invalid credentails', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    public async findByPayload({username}: any): Promise<UserDto>{
        return await this.findOne({ where: { username } });
    }

    public async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        //check if the user exists in the db
        const userInDb = await this.userRepository.findOne({
            where: { username }
        });
        if(userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepository.create({ username, password, email, });
        await this.userRepository.save(user);
        return toUserDto(user);
    }
}


