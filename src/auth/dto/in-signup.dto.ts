import { IsEmail, IsString, IsDateString } from 'class-validator';

export class InSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: string;
}
