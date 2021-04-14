import { IsEmail, IsString, IsDateString, IsEnum } from 'class-validator';
import { Roles, Role } from '../../roles';

export class InSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Role)
  role: Role;
}
