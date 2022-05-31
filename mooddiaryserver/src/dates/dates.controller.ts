import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatesService } from './dates.service';

@ApiTags('Entriecontroller')
@Controller('dates')
export class DatesController {
    constructor (private readonly datesService: DatesService){}

    //methoden
    @ApiOperation({ summary: 'Get all Dates' })
    @Get()
    public getAllDates(): Promise<Date[]> {
    return this.datesService.getAllDates();
  }

    @ApiOperation({ summary: 'Post new dates' })
    @Post()
    public async insertNewDate(@Body(ValidationPipe) date: Date): Promise<Date> {
        return this.datesService.insertNewDate(date);
    }


}
