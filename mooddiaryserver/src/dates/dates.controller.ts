import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/decorators/getUser.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/users/entity/User.entity';
import { DatesService } from './dates.service';
import { DatesQueryDto } from './dto/DatesQuery.dto';
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

    @ApiOperation({ summary: 'Get Dates by Id' })
    @Get('/:id')
    public async getEntryByID(@Param() params: DatesQueryDto): Promise<Date> {
      return this.datesService.getDateByID(params.id);
    }

    @ApiOperation({ summary: 'Delete Date' })
    @Delete('/:id')
    public async deleteEntrybyID(@Param() params: DatesQueryDto): Promise<any> {
      return this.datesService.deleteDateByID(params.id);
    }


}
