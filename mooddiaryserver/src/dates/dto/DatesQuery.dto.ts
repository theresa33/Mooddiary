import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class DatesQueryDto {
    @IsNotEmpty()
    @IsString()
    id: string
  
}