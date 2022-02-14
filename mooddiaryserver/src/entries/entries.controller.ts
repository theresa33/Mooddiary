import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EntriesQueryDto } from './dto/EntriesQuery.dto';
import { Entry } from './entity/Entry.entity';
import { EntriesService } from './entries.service';

@Controller('entries')
export class EntriesController {
  //injection von entriesservice in controller
  constructor(private readonly entriesService: EntriesService) {}

  //erste methode
  @Get()
  // @HttpCode(501)
  public getAllEntries(): Promise<Entry[]> {
    return this.entriesService.getAllEntries();
  }
  //es gibt zwei get deswegen brauchen wir einen placeholder für die id
  @Get('/:id')
  public async getEntryByID(@Param() params: EntriesQueryDto): Promise<Entry> {
    return this.entriesService.getEntryByID(params.id);
  }

  @Post()
  public async insertNewEntry(@Body(ValidationPipe) entry: Entry): Promise<Entry> {
    return this.entriesService.insertNewEntry(entry);
  }

  @Delete()
  public async deleteEntrybyID(@Param() params: EntriesQueryDto): Promise<Entry> {
    return this.entriesService.deleteEntryByID(params.id);
  }
}
