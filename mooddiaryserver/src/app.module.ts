import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entries/entries.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entries/entity/Entry.entity';
import { EntriesController } from './entries/entries.controller';
import { DatesModule } from './dates/dates.module';
import { DatesController } from './dates/dates.controller';

@Module({
  imports: [
    EntriesModule,
    UsersModule,
    DatesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'semesterprojekt',
      // entities: [Book],
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      dropSchema: false,
    }),
    TypeOrmModule.forFeature([Entry]),
    // TypeOrmModule.forFeature([Date])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
