import {
  IsEmail,
  IsString,
  IsDateString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from '../../roles';

export class InSignUpDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Role)
  role: Role;
}
