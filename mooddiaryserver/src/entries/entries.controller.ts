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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { runInThisContext } from 'vm';
import { EntriesQueryDto } from './dto/EntriesQuery.dto';
import { Entry } from './entity/Entry.entity';
import { EntriesService } from './entries.service';

@ApiTags('Entriescontroller')
@Controller('entries')
export class EntriesController {
  //injection von entriesservice in controller
  constructor(private readonly entriesService: EntriesService) {}

  //erste methode
  @ApiOperation({ summary: 'Get all Entries' })
  @Get()
  // @HttpCode(501)
  public getAllEntries(): Promise<Entry[]> {
    return this.entriesService.getAllEntries();
  }
  //es gibt zwei get deswegen brauchen wir einen placeholder für die id
  @ApiOperation({ summary: 'Get Entries by Id' })
  @Get('/:id')
  public async getEntryByID(@Param() params: EntriesQueryDto): Promise<Entry> {
    return this.entriesService.getEntryByID(params.id);
  }

  // @Get('/:userId')
  // public async getEntriesByUserId(@Param() params: EntriesQueryDto): Promise<Entry> {
  //   return this.entriesService.getEntriesByUserId(params.userId)
  // }

  @ApiOperation({ summary: 'Post new Entry' })
  @Post()
  public async insertNewEntry(@Body(ValidationPipe) entry: Entry): Promise<Entry> {
    return this.entriesService.insertNewEntry(entry);
  }

  @ApiOperation({ summary: 'Delete Entry' })
  @Delete('/:id')
  public async deleteEntrybyID(@Param() params: EntriesQueryDto): Promise<any> {
    return this.entriesService.deleteEntryByID(params.id);
  }
}
