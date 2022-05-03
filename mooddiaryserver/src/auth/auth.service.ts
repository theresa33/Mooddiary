import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { LoginUserDto } from 'src/users/dto/LoginUser.dot';
import { UserDto } from 'src/users/dto/User.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './auth.jwt.strategy';

export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,  ) {}

    async register(userDto: CreateUserDto): 
    Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'user registered',
    };
    try {
        await this.usersService.create(userDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    
    }
    return status;  
    }

    
    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }
    
    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }


}

//Keine ahnung ob diese zwei exports stimmen
export interface LoginStatus {}
