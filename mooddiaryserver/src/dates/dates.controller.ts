import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { DatesService } from './dates.service';

@Controller('dates')
export class DatesController {
    constructor (private readonly datesService: DatesService){}

    //methoden
    @Get()
    public getAllDates(): Promise<Date[]> {
    return this.datesService.getAllDates();
  }

    @Post()
    public async insertNewDate(@Body(ValidationPipe) date: Date): Promise<Date> {
        return this.datesService.insertNewDate(date);
    }


}
