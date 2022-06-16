import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/decorators/getUser.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/users/entity/User.entity';
import { runInThisContext } from 'vm';
import { EntriesQueryDto } from './dto/EntriesQuery.dto';
import { Entry } from './entity/Entry.entity';
import { EntriesService } from './entries.service';

@ApiTags('Entriescontroller')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('entries')
export class EntriesController {
  //injection von entriesservice in controller
  constructor(private readonly entriesService: EntriesService) {}

  //erste methode
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all Entries from User' })
  @Get()
  public getEntriesByUser(@getUser()user: User): Promise<Entry[]> {
    return this.entriesService.getEntriesByUser(user);
  }

  @ApiOperation({ summary: 'Get Entries by Id' })
  @Get('/:id')
  public async getEntryByID(@Param() params: EntriesQueryDto): Promise<Entry> {
    return this.entriesService.getEntryByID(params.id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Post new Entry' })
  @Post()
  public async insertNewEntry(@Body(ValidationPipe) entry: Entry, @getUser()user: User): Promise<Entry> {

    return this.entriesService.insertNewEntry(entry, user);
  }

  @ApiOperation({ summary: 'Delete Entry' })
  @Delete('/:id')
  public async deleteEntrybyID(@Param() params: EntriesQueryDto): Promise<any> {
    return this.entriesService.deleteEntryByID(params.id);
  }
}
