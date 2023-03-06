import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class createUserDto {

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}

export class logInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
