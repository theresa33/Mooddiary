import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DatesController } from './dates.controller';
import { DatesService } from './dates.service';
import { Date } from './entity/Date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Date]), 
  JwtModule.register({
    secret: 'abcdABCD1234554321',
    signOptions: {expiresIn: 3600}
    }),
  UsersModule],
  controllers: [DatesController],
  providers: [DatesService]
})
export class DatesModule {}
