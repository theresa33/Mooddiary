import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserDto } from 'src/users/dto/User.dto';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

export interface JwtPayload {  username: string;}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });  
    }
    
    // async validate(payload: JwtPayload): Promise<UserDto> {
    //     const user = await this.authService.validateUser(payload);
    //     if (!user) {
    //         throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    //     }    
    //     return user;  
    // }
}

