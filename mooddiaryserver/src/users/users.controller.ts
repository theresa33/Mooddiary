import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from './entity/User.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    //methoden:
    @Post()
    public async insertNewUser(@Body(ValidationPipe) user: User): Promise<User> {
        return await this.usersService.insertNewUser(user);
    }
}
