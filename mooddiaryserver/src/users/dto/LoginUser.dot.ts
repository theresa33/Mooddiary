import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
  }