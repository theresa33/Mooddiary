import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class DatesQueryDto {
    @IsString()
    id: string
  
    @IsBoolean()
    isTaken: boolean;
  
    @IsString()
    takenDate: string;
}