import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from './entity/User.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { PassThrough } from 'stream';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Usercontroller')
@Controller('user')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService) {}

    @ApiOperation({ summary: 'Register new user' })
    @Post('register')
    async register(
        @Body('username')username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        //chek if email already exists
        const checkEmail = await this.usersService.findOne({email});
        const hashedPassword = await bcrypt.hash(password, 12);

        if(!checkEmail){

        const user = await this.usersService.create({
            username,
            email,
            password: hashedPassword
        });
            //removing password von ausgabe
            delete user.password;
            return user;
        }
        else {
            throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST); 
        }

        
    }
    @ApiOperation({ summary: 'Login user' })
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true})response: Response
    ) {
        const user = await this.usersService.findOne({ email });
        if(!user){
            throw new HttpException('Invalid credentials / email', HttpStatus.BAD_REQUEST);    
        }
        if(!await bcrypt.compare(password, user.password)){
            throw new HttpException('Invalid credentials / password', HttpStatus.BAD_REQUEST);    
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true, sameSite:'none', secure:true});


        return {message: 'success', id:user.id};
    }

    @ApiOperation({ summary: 'Get user' })
    @Get('user')
    async user(@Req() request: Request){
        try {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);
        if(!data){
            throw new UnauthorizedException();
        }
        const user = await this.usersService.findOne({id: data['id']});

        //removing password von ausgabe
        const {password, ...result} = user;
        return result;

         } catch(e) {
        throw new UnauthorizedException();
        }

    }

    @ApiOperation({ summary: 'Logout User' })
    @Post('logout')
    async logout(@Res({passthrough: true})response: Response){
        response.clearCookie('jwt');

        return{ message: 'success'};
    }


}
