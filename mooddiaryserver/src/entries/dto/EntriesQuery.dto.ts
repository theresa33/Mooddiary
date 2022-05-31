import { IsNotEmpty, IsString } from 'class-validator';

export class EntriesQueryDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
