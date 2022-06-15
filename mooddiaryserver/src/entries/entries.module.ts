import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Entry } from './entity/Entry.entity';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]),
  JwtModule.register({
    secret: 'abcdABCD1234554321',
    signOptions: {expiresIn: 3600}
    }),
  UsersModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
