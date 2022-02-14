import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entity/Entry.entity';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
