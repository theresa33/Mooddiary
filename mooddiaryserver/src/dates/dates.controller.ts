import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/decorators/getUser.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/users/entity/User.entity';
import { DatesService } from './dates.service';
import { Date } from './entity/Date.entity';

@ApiTags('Entriecontroller')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('dates')
export class DatesController {
    constructor (private readonly datesService: DatesService){}

    //methoden
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get all Dates from User' })
    @Get()
    public getDatesByUser(@getUser()user: User): Promise<Date[]> {
    return this.datesService.getDatesByUser(user);
  }

    @UseGuards(AuthGuard) 
    @ApiOperation({ summary: 'Post new dates' })
    @Post()
    public async insertNewDate(@Body(ValidationPipe) date: Date, @getUser()user: User): Promise<Date> {
        return this.datesService.insertNewDate(date, user);
    }


}
