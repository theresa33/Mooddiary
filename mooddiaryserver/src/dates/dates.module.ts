import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatesController } from './dates.controller';
import { DatesService } from './dates.service';
import { Date } from './entity/Date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Date])],
  controllers: [DatesController],
  providers: [DatesService]
})
export class DatesModule {}
